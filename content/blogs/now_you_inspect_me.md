---
title: Now You Inspect Me
description: "Learn about the inspect method and it's purposes"
date: 2026-03-31
tags: ["ruby", "rails", "inspect"]
---

The `#inspect` method is used to customize how an object is logged or displayed in the IRB console. It is used by the `Logger` objects and the printer methods like `#p` and `#pp`.

::prose-blockquote{type="note"}
_For the beginners with a sense of humor:_
<br>
<br>
No, I am not joking. We really do have a method named `#pp`, short for **Pretty Print**.

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

The output have a class name, the object's encoded id and all the instance variables in it.

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

In most scenarios, how an object gets displayed doesn't matter outside of console unless you're logging it or printing it. But a proper display of values is useful for debugging.

::prose-blockquote{type="note"}
Ruby 4.0.0 introduced a new method [#instance_variables_to_inspect](https://github.com/ruby/ruby/pull/13555) to control what are the instance variables should be displayed by default `#inspect`. When you define that method, `#inspect` will automatically call it and only print those attributes returned by it.
::

For example, let's say you can _identify your note with starting content_ and you also want the created at time to be bit more readable.

For that you can define the `#inspect` method in our `Note` class in a following way:

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

However, there are few gotchas:

- if you are calling `#puts` or `#print` method with the object, it'll still print only class name and encoded id irrespective of what you defined in `#inspect` method for that object.
- If you're explicitly calling the `#inspect` method on the object, it'll return it as string object (with visible opening and end quotes, and escaped inner quotes). So in most cases, it is not meant to be called explicitly
