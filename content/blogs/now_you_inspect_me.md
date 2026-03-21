---
title: Now You Inspect Me
description: "Learn about the inspect method and it's purposes"
date: 2026-03-31
tags: ["ruby", "rails", "inspect"]
---

The `#inspect` method in Ruby is used to customize how an object is logged or displayed in the IRB console. It is internally called by the `Logger` objects and the printer methods like `#p` and `#pp`.

::prose-blockquote{type="note"}
_For the beginners with a sense of humor:_
<br>
<br>
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

But when a class has more instance variables or it's value has a lengthy display, it will get ugly.

```ruby [IRB Console]
Note.new("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
```

```[Output]
#<Note:0x00000001256b8980
 @content=
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
 @created_at=2026-03-17 19:26:11.707125 +0530>
```

In most scenarios, how an object gets displayed doesn't matter outside of console unless you're logging it. But a proper display of values is useful for debugging.

::prose-blockquote{type="note"}
Ruby 4.0.0 introduced a new method [#instance_variables_to_inspect](https://github.com/ruby/ruby/pull/13555) to control what are the instance variables should be displayed by `#inspect`. When you define that method, the default `#inspect` will automatically call it and only print those variables returned by it.
::

Let's say you can _identify your note with starting content_ and you also want the created at time to be bit more readable.

In that case, you can define the `#inspect` method in our `Note` class in a following way:

```ruby [IRB console]
require 'active_support/core_ext/string/filters'

class Note
  def initialize(content)
    @content = content
    @created_at = Time.now
  end

  def inspect
    "<Note \"#{@content.truncate(25)}\" @ #{@created_at.strftime("%a, %d %b %Y")}>"
  end
end
```

Now create a note with a lenghty content.

```ruby [IRB Console]
Note.new("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
```

```[Output]
<Note: "Lorem ipsum dolor sit ..." @ Tue, 17 Mar 2026>
```

Now this output is short, readable and has all info you want in a way you want them.

You can go even farther with our previous example and try this:

```ruby [Code Snippet]
#...
  def inspect
    puts "." <<  ("_" * 27) << "."
    puts "|" << (" " * 27) << "|"
    puts "| #{@content.truncate(25).ljust(25)} |"
    puts "|" << (" " * 27) << "|"
    puts "|" << (" " * 8) << "@ " << @created_at.strftime("%a, %d %b %Y") << " |"
    puts "|" << ("_" * 27) << "|"
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

Likewise, it can be customized as per your need.

However, there are few gotchas that you need to know:

- if you are calling `#puts` or `#print` method with the object, it'll still print only class name and encoded id irrespective of what you defined in `#inspect` method for that object.
- If you're explicitly calling the `#inspect` method on the object, it'll return it as string object (with visible opening and end quotes, and escaped inner quotes). So in most cases, it is not meant to be called explicitly

The reason why I want to talk about this method or how I came to know about it, is that it plays vital part in `ActiveRecord`'s query chaining and console experience.

---

### ActiveRecord, Inspect and Rails Console

This is how you usually write a query with active record:

```ruby [users_controller.rb]
User.select(:id, :email).where(active: true).order(:created_at).limit(20)
```

Even though it breaks the **Law of Demeter**, it is very convenient over raw SQL for most of the scenarios.

However, it is not only convenient, it is implemented with an interesting pattern. You can write the above the query in following way also:

```ruby [users_controller.rb]
query = User.select(:id, :email)
query = query.where(active: true)
query = query.order(:creater_at)
query.limit(20)
```

This is where `ActiveRecord`'s lazy loading shines. Each time you are calling a query-building method, it will add the changes to internal query and return `self`, where self is an instance of `ActiveRecord::Relation`. But it'll not execute the built query.

::prose-blockquote{type="note"}
The returning `self` part is the reason why you can chain methods and make long queries with the active record.
::

The final query will be executed only when you call an **enumerable method** on the query or explicitly convert it to an array (`#to_a`). This is why most of the queries in controller usually runs at rendering time. Because during rendering only, you have to iterate over the query result.

But if execute the above line of codes in Rails console, you'll see that four different queries getting executed. Because there is one more method that makes the relation object to execute query, which is (as the title says) the `#inspect` method.

Why? Because of the console experience. Writing active record queries in Rails conosle feels almost like writing SQL in SQL console.

In both scenarios, you are building up queries with conditions, selection, grouping, etc. And on hitting enter, you will get the query result in both.

Now imagine, you are getting something like this when you are writing `ActiveRecord` query in Rails console.

```ruby [Rails Console]
User.select(:id, :email).where(active: true)
#<ActiveRecord::Relation ...>
```

It is not neat, right? If `#inspect` is not firing the queries, this is what will happen. You have to call `#to_a` or some enumerable method to get the final result. That is why `#inspect` shares a important role in `ActiveRecord`.

Sometimes we are so used to getting the result but we forgot to ask how. Getting the query result in console instantly is an good example for that. It'll never happen that way in ruby files but happens in console.

Some of you might have faced a error like this when you were working in console:

```[Rails Console]
Kernal Inspection failed for <object>...
```

That is because either query is loaded but an error was raised during inspect or an error was raised even before loading the query. However, if it is former, there is some chance you can still get the result by calling `#to_a` on the relation.

In any case, the `ActiveRecord` serves as good example for why defining the `#inspect` for custom object matters and helps.
