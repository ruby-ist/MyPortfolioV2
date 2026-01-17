---
title: The Return of the Proc
description: ...
date: 2026-01-17
tags: ["ruby", "closures"]
---

Have you ever been asked what are the differences between `proc` and `lambda`? I'm sure the devs who studied Ruby closures exclusively have been asked and are capable of answering that question. Let's talk about the differences and explore one thoroughly in particular. (_If you already know the basic about the differences, go the [main section](/blogs/return_of_the_proc#the-return-of-the-proc) of this blog_)

There are three main differences (or two if you don't consider the first one worthy):

1. Instantiation
2. Arity Check
3. Return behavior

### 1. Instantiation

These are the common ways to instantiate a `proc` and a `lambda`:

```ruby [IRB console]
# proc
Proc.new { |x| x * 2 }
proc { |x| x * 2 }

# lambda
lambda { |x| x * 2 }
->(x) { x * 2 }
```

Though the syntax differs, that's not their only differentiation in instantiation. These are explicit instantiations. When coming to implicit ones, we have two scenarios.

First one is when you pass a `block` (not `proc` or `lambda` but `block`) to a method, it'll always gets converted to `proc`.

```ruby [IRB console]
def what_am_i_giving_you(&block)
  p block
end

what_am_i_giving_you { |x| x * 2 } # => #<Proc:0x000000010cb7df88>
```

However if you explicitly convert a `proc` or `lambda` to a `block` by `&` indicator in _method call_, the flavor remains as it is.

```ruby [IRB console]
pr = proc { |x| x * 2 }
la = lambda { |x| x * 2 }

what_am_i_giving_you(&pr)  #=> #<Proc:0x000000010cf51330>
what_am_i_giving_you(&la)  #=> #<Proc:0x000000010cf51268 (lambda)>
```

The second one is that when you call `to_proc` on any method, it will always return a `lambda`

```ruby [IRB console]
def double_it(x) = x * 2
method(:double_it).to_proc #<Proc:0x0000000109bfc390 (lambda)>
```

The reason for this different type of implicit conversions brings us to our second differnce...

---

### 2. Arity Check

`lambda` is strict about its _arity_ while the `proc`... doesn't care!

> `arity` of a method is an indication of the number of arguments accepted by it

```ruby [IRB console]
la = lambda { |x| x * 2 }
la.call(2) # => 4
la.call() # => wrong number of arguments (given 0, expected 1) (ArgumentError)
la.call(1,2,3) # => wrong number of arguments (given 3, expected 1) (ArgumentError)
```

```ruby [IRB console]
pr = proc { |x| x * 2 }
pr.call(2) # => 4
pr.call() # => undefined method '*' for nil (NoMethodError)
pr.call(1,2,3) # => 2
```

No matter how many or less arguments you pass to a `proc`, it'll only take what it needs. If it doesn't have enough to take, it'll assume the value for it's arguments as `nil`

This is one of the reason why `to_proc` on `Method`, returns a `lambda` because a method is expected to check it's number of inputs unless given a default values.

The absence of arity check on `proc` makes it suitable of `block` to `proc` conversion as there are use cases where we might not need all the arguments yield to a `block`.

---

### 3. Return behaviour

I'll first go with `lambda` because it is easy to explain.

A `return` statement inside a `lambda` will return the flow to where `lambda` is initially called.

```ruby [IRB console]
def some_method
  la = lambda { return }
  la.call
  p "prints this!"
end

some_method # => prints this!
```

A `return` statement inside a `proc` will _return from the scope where proc was defined_.

```ruby [IRB Console]
def some_method
  pr = proc { return }
  pr.call
  p "does not print this!"
end

some_method # => nil
```

When I first read about this, I shrugged it off thinking it is not something to worry about. But later when I tried to take advantage of it, it threw a brick in my face and thus, we come to the title of this blog...

### The Return of the Proc

Try to guess the output of this code

```ruby [IRB Console]
def create_a_doubler_proc
  proc { |x| return x * 2 }
end

def double_it(y)
  create_a_doubler_proc.call(y)
  p "does not print this!"
end

double_it(4)
```

Instead of copying and executing it, try to reason with it first. You are calling a method which is calling an another method to get a `proc` and calling that `proc` with an argument passed to it. So, `return` should be triggered for `#double_it` and will return 8 right?

Now run it: (_and be ready for the brick_)

```[IRB Console]
'block in Object#create_a_doubler_proc': unexpected return (LocalJumpError)
```

Why?? Because `return` will be triggered for the method `#create_a_doubler_proc` (where `proc` was defined), not for the method. `#double_it` (where `proc` was used).

By the time it is triggered, there is no `#create_a_doubler_proc` in the current stock to return because it is already executed and returned before `proc` is called.

However if you removed `return` statement, it'll not try to return anything by force, the value last statement inside the `proc` will return to where the `proc` was called. (like `lambda`'s `return` behaviour)

This annoying behaviour makes the `proc` to be used with extra care. In fact, you can never use a `proc`, with an explicit `return` statement, which is returned by some other method and also you cannot call `return` statement inside a `block` which is accepted by a method.

```ruby [IRB console]
def yielder
  yield
end

yielder do
  return true # unexpected return (LocalJumpError)
end
```

If you **have to** use a `proc` and also needs a explicit return statement, you can use the `next` statement.

> `next` statement not only moves to next iteration, but it returns the current iteration (i.e, current scope). It can even be called with arguments like the `return` statement.

The `next` statement inside a `proc`, `lambda` and `proc` will work like `lambda`'s `return` statement.

```ruby [IRB console]
def yielder
  yield
end

yielder do
  next true # => true
end
```

...

**However** if you choose to give in to your dark side and want to write a code like a spell with hidden riddle, you can utilize the `proc`'s return behavior in some places where you want to a jump like `throw` or `raise` but doesn't want to use `throw` or `raise` (_Yes, like a psychopath_)

```ruby [IRB Console]
def call_a_proc(func, arg)
  result = func.call(arg)
  p "prints it only for odd numbers"
  result
end

def double_only_if_odd(y)
  pr = proc do |x|
    return if x.even?
    x * 2
  end

  result = call_a_proc(pr, y)

  p "prints it only for odd numbers"
  result
ensure
  p "prints it for all numbers"
end
```

```ruby [IRB Console]
double_only_if_odd(2)
# "prints it for all numbers"
# => nil
double_only_if_odd(3)
# "prints it only for odd numbers"
# "prints it only for odd numbers"
# "prints it for all numbers"
# => 6
```

The above flow can be easily and cleanly implemented with `raise`, `throw` or some `if` conditions.

This weird `return` behavior of `proc` is always stated out but not explained enough. But it doesn't make `proc` completely unusable. A `proc` does have its own purpose. Like I said, you just have to be extra careful when returning from a `proc`. (_and make sure no brick is thrown to your face_)
