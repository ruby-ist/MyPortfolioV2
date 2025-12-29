---
title: Consequences of using mixins at top level
date: 29/12/2025
tags: ["ruby", "rails"]
---

Have you ever seen or included a module at the top level, outside of all classes and module? If yes, then you already regretting it, removed it or going to regret it. Let's see why.

Consider a module named `CommonHelper`

```ruby
require 'tzinfo'

module CommonHelper
  def current_time_in_chicago
    TZInfo::Timezone.get('America/Chicago').now
  end
end
```

A module is usually mixed into a class or in some weird use case, to a object.

The purpose of a mixin is mainly to inherit an interface. In larger application (like in Rails), it is also for code organizations.

Most of the beginners will forgot the former purpose and solely create a module for the latter. In our case, we have a module called `CommonHelper` created for, as the name says, to be a common helper.

After creating this module, considering its name and purpose, you might want it to be available everywhere and try to include it in top level in some files. Let's say in the `application.rb`

```ruby application.rb
require_relative '../app/helpers/common_helper'

include CommonHelper

#...
```

Now, the methods `current_time_in_chicago` will be available throughout the application.

```ruby resource.rb
class Resource
  def update_processed_at
    update(processed_at: current_time_in_chicago)
  end
end
```

```ruby
class ResourcesController
  def index
    @resources = Resource.where(updated_at: (current_time_in_chicago - 1.day)..)
  end
end
```

Quite useful, right?

**No, it is not**

Because you just shot yourself in foot with a machine gun and you have no way to know it.

Try the following in Rails console:

```ruby
current_time_in_chicago
CommonHelper.current_time_in_chicago
Time.current_time_in_chicago
Date.current_time_in_chicago
```

All of them will return the the current time in chicago. If that hasn't weirded you out yet, try the following:

```ruby
nil.current_time_in_chicago
```

Now, you will realize something is fishy here. I'll explain why but let's refresh how mixins works first.

> `include` is used to mixin a module interface to any instances of a class. It can only be called from the scope of a class.

> `prepend` works in a same way as `include` but the only differnce is that if you `prepend` a module, methods defined in that module will appear first in method lookup path of instances instead of methods defined in the class. (it'll override the methods in the class)

> `extend` is used to mixin a module to a single object. It can either be class or object (_inner me is screaming both are SAME!!!_). After extending, methods defined in the extended module will appear first in the method lookup path of the object.

All of them are basically methods provided by the `Kernel` module. Everytime you are using them, you are basically calling them in some scope. All of them will return the scope owner in which it's included, extended or prepended.

Consider a module and a class,

```ruby
  module Foo
    def ping
      "pong"
    end
  end

  class Bar
  end
```

On the class level,

```ruby
  Bar.include Foo #=>  Bar  (instances of Bar will inherit `ping` method)
  Bar.extend Foo #=> Bar  (Bar will inherit `ping` method)
  Bar.prepend Foo #=> Bar  (instances of Bar will inherit `ping` method, Foo will be added to first in method lookup path of Bar instances)
```

Same logic applies for `singleton` classes as well.

On the object level,

```ruby
  b = Bar.new
  b.include Foo #=>  Error: undefined method `include`
  b.prepend Foo #=>  Error: undefined method `prepend`
  b.extend Foo  #=> #<B:0x0000000128f21e70>  (Only the variable b will inherit `ping` method)
```

Let's see what it returns on top level

```ruby
  include Foo #=> Object
  extend Foo #=> main
  prepend Foo #=> Error: undefined method `prepend`
```

Due to overriding nature of `prepend`, you can't even call it in top level.

Calling `extend` with any module in top level will return `main` as a return value. `main` is a special object in ruby. Within its scope only, all of the top level codes are executed. So extending `main` with a module will make that module methods to be available in `main` (top level execution). This is the expected behavior of `extend`.

Calling `include` with any module in top level will return `Object` as output. If you read the definition again, you'll notice the abnormality here. `main` is an object. You cannot call `include` method in any other objects in ruby. But `main` allows it and the module is included in scope of an `Object`, which is practically everyhere.

In Ruby, everything is an object. By that rule everything is inherited from `Object`. This is the reason why our method `current_time_in_chicago` was available for all objects, even `nil` value. Because even `nil` is an instance of `Object`.

A single one line mistake can bloat all objects in ruby, leading to unwanted methods available in all objects. It'll also mess up the method look up path for all objects and lead to unexpected behaviors like a method that is supposed to call a super method, calling itself. (endless recursion).

You might ask "Using `extend` on top level is safe, right?". The answer is yes and no. Just because you can, you shouldn't. We are writing a Object Oriented Programming here. So it never makes sense to extend an interface outside of all the objects, not even for code organization or reusability.
