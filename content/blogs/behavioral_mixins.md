---
title: Behavioral Mixins
description: "Learn about modules like Forwardable, Comparable, Enumerable and Observable in Ruby"
date: 2026-02-22
tags: ["ruby", "mixins"]
---

Mixins are often misused. Instead of being a module where a sharable behaviour and interface can exist, they often became a module created only to store interfaces tied up to a specific class.

Ruby has many in-built mixins that serve a quite useful use cases. These modules not only handy, but can be used to study how one should define a mixin.

In this blog, I want to talk about few of such modules:

- [Forwardable](#Forwardable)
- [Comparable](#Comparable)
- [Enumerable](#Enumerable)
- [Observable](#Observable)

---

### Forwardable

Forwardable is useful when you want the interface of the composed object to be available on composing object. Unlike other modules, this need to be mixed with `extend` instead of `include`.

```ruby [IRB Console]
require 'forwardable'

class ShoppingList
  extend Forwardable

  def_delegators :@list, :count, :keys, :[], :[]=, :each

  def initialize
    @list = {}
  end
end

sl = ShoppingList.new
sl[:tomato] = 12
sl[:biscuits] = 10
sl[:soap] = 2

pp sl.count                         #=> 3
pp sl.keys                          #=> [:tomato, :biscuits, :soap]
sl.each { |k, _| pp k == :tomato }  # => true, false, false
```

The first argument of `#def_delegators` doesn't have to be instance variables but can also be any method name that returns an object.

The `Forwardable` module contains methods (i.e. `#def_delegators`, etc) that is meant to be invoked in the scope of a class. Such kind of definition can provide a behaviors or class interfaces that helps to define the interface for the objects.

### Comparable
