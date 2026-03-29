---
title: Now You Inspect Me
description: "Why does Rails console execute queries automatically? Learn how Ruby’s #inspect method works, how to customize it, and its role in Active Record."
date: 2026-03-29
tags: ["ruby", "rails", "inspect"]
---

The `#inspect` method in Ruby is used to customize how an object is displayed in the console or logged. It is commonly used by debugging tools, console output, and methods like `#p` and `#pp`.

::prose-blockquote{type="note"}
Yes, we really do have a method named `#pp`, short for **Pretty Print**.
::

Consider a `Note` class:

```ruby [IRB console]
class Note
  def initialize(content)
    @content = content
    @created_at = Time.now
  end
end

Note.new("My First Note!")
```

This is how it usually looks in the console:

```[Output]
#<Note:0x0000000123274b78 @content="My First Note!", @created_at=2026-03-17 19:19:43.876385 +0530>
```

The output will have a class name, the object's encoded id and all the instance variables in it.

But when a class has more instance variables or its values are lengthy, the output can get messy.

```ruby [IRB Console]
Note.new("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
```

```[Output]
#<Note:0x00000001256b8980
 @content=
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
 @created_at=2026-03-17 19:26:11.707125 +0530>
```

In most scenarios, how an object gets displayed doesn't matter outside of the console unless you're logging it. But a proper display of values is useful during debugging.

::prose-blockquote{type="note"}
Ruby 4.0.0 introduced a new method [#instance_variables_to_inspect](https://github.com/ruby/ruby/pull/13555) to control which instance variables should be displayed by `#inspect`. When you define that method, the default `#inspect` will automatically call it and only print those variables returned by it.
::

Let's say you can _identify your note with starting content_ and you also want the created at time to be a bit more readable.

In that case, you can define the `#inspect` method in our `Note` class in the following way:

```ruby [IRB console]
require 'active_support/core_ext/string/filters'

class Note
  def initialize(content)
    @content = content
    @created_at = Time.now
  end

  def inspect
    "<Note \"#{@content.truncate(25)}\" @ #{@created_at.strftime('%a, %d %b %Y')}>"
  end
end
```

Now create a note with lengthy content.

```ruby [IRB Console]
Note.new("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
```

```[Output]
<Note: "Lorem ipsum dolor sit ..." @ Tue, 17 Mar 2026>
```

Now this output is short, readable and has all the information you want, presented the way you want it.

You can go even farther with our previous example and try this:

```ruby [Code Snippet]
#...
  def inspect
    <<~STR
    .___________________________.
    |                           |
    | #{@content.truncate(25).ljust(25)} |
    |                           |
    |        @ #{@created_at.strftime("%a, %d %b %Y")} |
    |___________________________|
    STR
  end
#...
```

```ruby [IRB Console]
Note.new("Did I already wrote my second note?")
```

```[Output]
.___________________________.
|                           |
| Did I already wrote my... |
|                           |
|        @ Tue, 17 Mar 2026 |
|___________________________|
```

Likewise, it can be customized based on your needs.

However, there are a few gotchas that you need to know:

- If you call `#puts` or `#print`, Ruby uses `#to_s`, not `#inspect`, so your custom formatting won’t be used.
- If you're explicitly calling the `#inspect` method on the object, it will return it as a string (with visible opening and closing quotes, and escaped inner quotes). So in most cases, it is not meant to be called explicitly

The reason why I want to talk about this method or how I came to know about it, is that it plays a vital part in `ActiveRecord`'s query chaining and console experience.

---

### ActiveRecord, Inspect and Rails Console

This is how you usually write a query with `ActiveRecord`:

```ruby [users_controller.rb]
User.select(:id, :email).where(active: true).order(:created_at).limit(20)
```

Even though it involves chaining multiple methods, it is very convenient over raw SQL for most scenarios.

However, it’s not just convenient—it’s implemented using an interesting pattern. You can also write the above query in the following way:

```ruby [users_controller.rb]
query = User.select(:id, :email)
query = query.where(active: true)
query = query.order(:created_at)
query.limit(20)
```

This is where `ActiveRecord`'s lazy loading shines. Each time you call a query-building method, it will add the changes to the internal query and return `self`, where self is an instance of `ActiveRecord::Relation`. But it will not execute the built query.

::prose-blockquote{type="note"}
The returning `self` part is the reason why you can chain methods and make long queries with the `ActiveRecord`.
::

The query is executed only when you call an **enumerable method** on the query or explicitly convert it to an array (`#to_a`). This is why most of the queries in a controller usually runs at rendering time. Because only during rendering, you have to iterate over the query result.

But if you execute the above lines of code in Rails console, you'll see that four different queries are executed. Because there is one more method that can cause the relation to execute the query, which is (as the title says) the `#inspect` method.

Why? Because of the console experience. Writing `ActiveRecord` queries in Rails console feels almost like writing SQL in an SQL console.

In both scenarios, you are building up queries with conditions, selection, grouping, etc. And on hitting enter, you will get the query result in both.

Now imagine, you are getting something like this when you are writing `ActiveRecord` query in Rails console.

```ruby [Rails Console]
User.select(:id, :email).where(active: true)
#<ActiveRecord::Relation ...>
```

That’s not very helpful, right? If `#inspect` is not firing the queries, this is what will happen. You have to call `#to_a` or some enumerable method to get the final result. That is why `#inspect` plays an important role in `ActiveRecord`.

> “Sometimes we are so used to getting the result that we forget to ask how.”

Getting the query result in console instantly is a good example for that. This won’t happen in Ruby files—it only happens in the console.

Some of you might have faced an error like this when you were working in console:

```[Rails Console]
Kernel Inspection failed for <object>...
```

That is because either the query is loaded but an error was raised during inspect or an error was raised even before loading the query. However, if it is the former, you may still be able to get the result by calling `#to_a` on the relation.

In any case, `ActiveRecord` is a great example of why defining `#inspect` for custom objects matters—it directly impacts how we debug, explore, and understand our data in real time.
