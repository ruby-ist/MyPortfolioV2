---
title: The Return of the Proc
description: Understand the real differences between Ruby proc and lambda, including arity, instantiation, and the infamous non-local return.
date: 2026-01-17
tags: ["ruby", "closures"]
---

Have you ever been asked what the differences between `proc` and `lambda` are? I’m sure the developers intrigued by Ruby closures have been asked this—and are probably capable of answering it. Let’s talk about those differences and take a closer look at one in particular.

There are three main differences (or two, if you don’t think the first one counts):

1. Instantiation
2. Arity check
3. Return behavior

::prose-blockquote{type="note"}
If you already know the basics of these differences, skip ahead to the [main section](/blogs/the_return_of_the_proc#the-return-of-the-proc) of this blog.
::

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

Although the syntax differs, that’s not the only distinction in instantiation. These are explicit instantiations. There are two implicit instantiation scenarios.

The first occurs when you pass a `block` (not a `proc` or `lambda`, but a `block`) to a method, it gets captured as a `proc`.

```ruby [IRB console]
def what_am_i_giving_you(&block)
  p block
end

what_am_i_giving_you { |x| x * 2 } # => #<Proc:0x000000010cb7df88>
```

However, if you explicitly convert a `proc` or `lambda` to a `block` using the `&` indicator in a method call, the original behavior is preserved.

```ruby [IRB console]
pr = proc { |x| x * 2 }
la = lambda { |x| x * 2 }

what_am_i_giving_you(&pr) # => #<Proc:0x000000010cf51330>
what_am_i_giving_you(&la) # => #<Proc:0x000000010cf51268 (lambda)>
```

The second one occurs when you call `#to_proc` on a `Method`. It will always return a `lambda`.

```ruby [IRB console]
def double_it(x) = x * 2
method(:double_it).to_proc # => #<Proc:0x0000000109bfc390 (lambda)>
```

The reason for these different implicit conversions brings us to our second difference…

### 2. Arity Check

::prose-blockquote{type="note"}
The `arity` of a method indicates the number of arguments it accepts.
::

A `lambda` enforces arity strictly, while a `proc`… doesn’t care.

```ruby [IRB console]
la = lambda { |x| x * 2 }
la.call(2) # => 4
la.call() # => wrong number of arguments (given 0, expected 1) (ArgumentError)
la.call(1, 2, 3) # => wrong number of arguments (given 3, expected 1) (ArgumentError)
```

```ruby [IRB console]
pr = proc { |x| x * 2 }
pr.call(2) # => 4
pr.call() # => undefined method '*' for nil (NoMethodError)
pr.call(1, 2, 3) # => 2
```

No matter how many (or how few) arguments you pass to a `proc`, it takes only what it needs. If it doesn’t have enough, it assigns `nil` to the missing arguments.

This is the reasons why calling `#to_proc` on a `Method` returns a `lambda` because it must preserve method semantics such as strict arity and return behavior

The lack of strict arity checking also makes `proc` suitable for block-to-proc conversion, since there are use cases where we don’t need all the arguments yielded to a `block`.

### 3. Return Behavior

Let’s start with `lambda`, because it’s easier to explain.

A `return` statement inside a `lambda` returns control to the line where the `lambda` was called.

```ruby [IRB console]
def some_method
  la = lambda { return }
  la.call
  p "prints this!"
end

some_method # => "prints this!"
```

A `return` statement inside a `proc`, on the other hand, _returns from the method context where the `proc` was defined_. In other words, a non-local return.

```ruby [IRB console]
def some_method
  pr = proc { return }
  pr.call
  p "does not print this!"
end

some_method # => nil
```

When I first read about this, I shrugged it off, thinking it wasn’t something to worry about. Later, when I tried to take advantage of it, it threw a brick in my face—and thus, we arrive at the title of this blog.

---

### The Return of the Proc

Try to guess the output of this code:

```ruby [IRB console]
def create_a_doubler_proc
  proc { |x| return x * 2 }
end

def double_it(y)
  func = create_a_doubler_proc
  func.call(y)
  p "does not print this!"
end

double_it(4)
```

Instead of copying and executing it, let’s reason it out first. You’re calling a method that calls another method to get a `proc`, then calling that returned `proc` with an argument. So the `return` should be triggered inside `#double_it`, return `8`, and print nothing… right?

Now run it (_and brace yourself for the brick_):

```[IRB console]
'block in Object#create_a_doubler_proc': unexpected return (LocalJumpError)
```

Why??

Because the `return` is triggered for the method `#create_a_doubler_proc`—where the `proc` was defined—not for `#double_it`, where the `proc` was used.

By the time the `proc#call` is called, `#create_a_doubler_proc` has already finished executing and returned. there is no `#create_a_doubler_proc` in the current stack, which is why the error was raised.

If you remove the `return` statement, the `proc` won’t try to force a return. Instead, the value of the last expression inside the `proc` will be returned to where `proc#call` was invoked—similar to a `lambda`’s `return` behavior.

This behavior is why `proc` needs to be handled with extra care.

In fact, you can never use a `proc` with an explicit `return` if that `proc` is returned by another method. It's also why you cannot use `return` inside the body of a method’s `block`.

```ruby [IRB console]
def yielder
  yield
end

yielder do
  return true # => unexpected return (LocalJumpError)
end
```

If you **have to** use a `proc` and also need an explicit `return`-like control flow, you can use the `next` statement instead.

::prose-blockquote{type="note"}
The `next` statement not only moves to the next iteration, but also returns a value from the current iteration (i.e, exits the current `block` or `proc` invocation with a value.). Like `return`, it can also be called with arguments.
::

Inside a `proc`, `lambda`, or `block`, `next` mirrors a `lambda`’s `return` behavior.

```ruby [IRB console]
def yielder
  yield
end

yielder do
  next true
end # => true
```

…

**However,** if you decide to embrace your dark side and write code that reads like an unreadable spell, you _can exploit a `proc`’s `return` behavior_ in certain cases.

For example, when you want something like `throw` or `raise`, but not quite—or don’t actually want to use either (_like a menace to readability!_).

```ruby [IRB console]
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

```ruby [IRB console]
double_only_if_odd(2)
# "prints it for all numbers"
# => nil
double_only_if_odd(3)
# "prints it only for odd numbers"
# "prints it only for odd numbers"
# "prints it for all numbers"
# => 6
```

This flow can be implemented far more cleanly using `raise`, `throw`, or simple `if` conditions.

The weird `return` behavior of `proc` is often mentioned, but rarely explained in depth. But that doesn’t make `proc` unusable—it just means it has sharp edges. A `proc` has its own purposes and valid use cases.

Like I said, you just have to be extra careful when returning from a `proc` (_and lookout for flying bricks \*\_\*_).
