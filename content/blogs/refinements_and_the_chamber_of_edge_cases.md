---
title: Refinements and the Chamber of Edge Cases
description: "Learn how Ruby refinements work, including lexical scope, inheritance and block edge cases, top-level usage, and when to prefer them over monkey patching."
date: 2026-02-22
tags: ["ruby"]
---

One of the most featured alternatives to monkey patching in Ruby is [Refinements](https://docs.ruby-lang.org/en/3.4/syntax/refinements_rdoc.html){:target="\_blank"}, with the help of the `refine` and `using` methods.

Let's say we need to translate words in [Groot](https://en.wikipedia.org/wiki/Groot){:target="\_blank"}'s language and you want the translation to happen via a method that is available on all strings. To achieve this, you can open the `String` class in Ruby and add a new method `#in_groot`.

```ruby [IRB Console]
class String
  def in_groot
    "I am Groot"
  end
end

"Hello World".in_groot  # => I am Groot
```

This is what we call **monkey patching**.

However, this is generally considered a bad practice as it violates the **Open/Closed Principle** of the SOLID principles. (i.e., it can introduce a different or conflicting interface for a class that is already defined, used and in communication with other parts of the system)

In most of the languages, this wouldn’t even be possible but good old Ruby allows it like a super power, and to make sure it is used with great responsibility, refinements comes into play.

To define refinements, you first have to `refine` one or more classes under a module:

```ruby [refinements.rb]
module GrootLanguageSupport
  refine String do
    def in_groot
      "I am Groot"
    end
  end
end
```

::prose-blockquote{type="note"}
You can not only define methods inside a refinement, but also import methods from a module using the [Refinement#import_methods](https://docs.ruby-lang.org/en/master/Refinement.html#method-i-import_methods) method. However, this behaves more like copying than inheriting, so any change made to the original methods after import will not be reflected.
::

And then you can use the module to _activate_ the refinements:

```ruby [message.rb]
require_relative 'refinements'

class Message
  using GrootLanguageSupport
  attr_reader :content

  def initialize(content)
    @content = content
  end

  def translate_to_groot
    content.in_groot
  end
end

m = Message.new("Hello")
puts m.translate_to_groot # => I am Groot
```

The advantage of the refinements over monkey patching is that whatever modifications you've made will only be activated in the **lexical scope** where you are `using` the refinements. In our case, refinements to `String` will only be active within the lexical scope of the `Message` class's scope and will not be active anywhere else.

::prose-blockquote{type="note"}
_Lexical scope_ (also known as _static scope_) determines visibility based on where code is defined in the source, not where it is executed. In contrast, _scope_ in general often refers to runtime visibility, which can vary depending on the call site or receiver.
::

But one man's advantage is another man's limitation. Due to its restrictive nature, refinements behave in a way that feels a bit strange in some scenarios. For example, let's say you are inheriting from the `Message` class, which has refinements, to create a new class `AngryMessage`:

```ruby [message.rb]
require_relative 'refinements'

class Message
  using GrootLanguageSupport
  attr_reader :content

  def initialize(content)
    @content = content
  end

  def translate_to_groot
    content.in_groot
  end
end

class AngryMessage < Message
  def angry_content
    content.upcase
  end

  def angry_translation_to_groot
    angry_content.in_groot
  end
end

m = AngryMessage.new("You need to leave!!")
puts m.angry_content                          # => YOU NEED TO LEAVE!!
puts m.translate_to_groot                     # => I am Groot
puts m.angry_translation_to_groot             # => undefined method 'in_groot' for an instance of String (NoMethodError)
```

Refinements are active inside the methods that are defined in the parent class `Message` but they are not active for the methods that are defined in the child class `AngryMessage`.

This is because refinements are resolved at _method definition time, not at call time_, which is why methods defined in subclasses don’t see refinements from parent classes. (i.e., any class inheriting from another class with refinements, will not inherit those refinements)

Refinements are also not active inside any `blocks` given to a method which was defined when refinements were active:

```ruby [message.rb]
require_relative 'refinements'

class Message
  using GrootLanguageSupport
  attr_reader :content

  def initialize(content)
    @content = content
  end

  # ...

  def yield_content
    puts content.in_groot    # => I am Groot
    yield content
  end
end

m = Message.new("hello")

m.yield_content do |content|
  puts content.in_groot      # => undefined method 'in_groot' for an instance of String (NoMethodError)
end
```

You probably wouldn’t use this in day-to-day life, but the same applies to `instance_eval` and `class_eval`:

```ruby [message.rb]
#...
m = Message.new("hello")
m.instance_eval do
  content.in_groot         # => undefined method 'in_groot' for an instance of String (NoMethodError)
end

Message.class_eval do
  "Hello world".in_groot   # => undefined method 'in_groot' for an instance of String (NoMethodError)
end
```

You're probably now wondering what if I used the refinements at the top level.

In that case, the refinements will be active everywhere under the file where it is used. If you load that file in some other file, it will not be active there.

Let's change our `message.rb` file so that it uses refinements on top level:

```ruby [message.rb]
require_relative 'refinements'

using GrootLanguageSupport

class Message
  attr_reader :content

  def initialize(content)
    @content = content
  end

  def translate_to_groot
    content.in_groot
  end

  def yield_content
    yield content
  end
end

puts "World".in_groot          # => I am Groot

m = Message.new("Hello")
puts m.translate_to_groot      # => I am Groot

m.yield_content do |content|
 puts content.in_groot         # => I am Groot
end
```

Now let's require this file in some other file, let's say `message_processor.rb`:

```ruby [message_processor.rb]
require_relative 'message'

m = Message.new("Hello")
puts m.translate_to_groot     # => I am Groot

m.yield_content do |content|
  puts content.in_groot       # => undefined method 'in_groot' for an instance of String (NoMethodError)
end

puts "World".in_groot         # => undefined method 'in_groot' for an instance of String (NoMethodError)
```

So, while using our refinements, you have to activate it explicitly with `using GrootLanguageSupport` in wherever the places you need it.

This one line rule may be annoying to keep track of while writing code, but it improves the readability of the code by stating what are all the classes are using the refinements and in which module they were refined.

This is why refinements are favored over monkey patching. You have to keep in mind that they still violate the Open/Closed Principle, but in a more careful, declarative way.

If you are still not satisfied with refinements and need a "true" alternative to monkey patching, you can always create a subclass.

```ruby [multilingual_string.rb]
class MultilingualString < String
  def in_groot
    "I am Groot"
  end
end

str = MultilingualString.new('hello')
str.in_groot    # => I am Groot
```

```ruby [message.rb]
require_relative 'multilingual_string'

class Message
  attr_reader :content

  def initialize(content)
    @content = content
  end

  def translate_to_groot
    content.in_groot
  end
end

mc = MultilingualString.new("hello")
m = Message.new(mc)
puts m.translate_to_groot # => I am Groot
```

Of course, this won't offer you the syntactic advantages of creating a string with double quotes. But it is clean and does not violate any design principle. So in the end, it's all about the trade-offs you are willing to take.
