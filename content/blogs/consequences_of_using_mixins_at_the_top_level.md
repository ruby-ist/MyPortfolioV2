---
title: Consequences of using mixins at the top level
date: 29/12/2025
tags: ["ruby", "rails"]
---

Have you ever seen or included a module at the top level outside of all classes and modules? If yes, you've already regretted it, removed it, or you're going to regret it. Let's see why.

Consider a module named `CommonHelper`:

```ruby [app/helpers/common_helper.rb]
module CommonHelper
  def current_time_in_chicago
    TZInfo::Timezone.get('America/Chicago').now
  end
end
```

A module is usually mixed into a class or in some weird use case to an object. The purpose of a mixin is mainly to share behaviours and compose interfaces. In larger applications (like in Rails), it is also for code organization.

Most beginners will forget the former purpose and solely create modules for the latter. In our case, we have a module called `CommonHelper` created, as the name says, to be a common helper.

After creating this module, considering its name and purpose, you might want it to be available everywhere and try to include it at the top level in some files. Let's say in the `application.rb` file of a Rails application.

```ruby [config/application.rb]
require_relative '../app/helpers/common_helper'

include CommonHelper

#...
```

Now, the method `current_time_in_chicago` will be available throughout the application.

```ruby [app/models/resource.rb]
class Resource < ApplicationRecord
  #...
  def update_processed_at
    update(processed_at: current_time_in_chicago)
  end
  #...
end
```

```ruby [app/controllers/resources_controller.rb]
class ResourcesController < ApplicationController
  #...
  def index
    @resources =
      Resource
        .where(updated_at: (current_time_in_chicago - 1.day)..)
  end
  #...
end
```

Quite useful, right?

**No, it is not**

Because you just shot yourself in the foot with a machine gun—and the most horrifying part is that it doesn’t hurt you.

Try the following in the Rails console:

```ruby [>_ Rails Console]
current_time_in_chicago
CommonHelper.current_time_in_chicago
Time.current_time_in_chicago
Date.current_time_in_chicago
```

All of them will return the current time in Chicago. If that hasn't weirded you out yet, try the following:

```ruby [>_ Rails Console]
nil.current_time_in_chicago
```

Now you will realize something is fishy here. I'll explain why but let's refresh how mixins work first.

> `include` is used to mix in a module interface to any instances of a class. It can only be called from the scope of a class.

> `prepend` works in the same way as `include` but the difference is that if you prepend a module, methods defined in that module will appear first in the method lookup path of instances, instead of methods defined in the class. (it'll override the methods defined in the class)

> `extend` is used to mix in a module to a single object. It can either be class or object (_inner me is screaming both are same!_). After extending, methods defined in the extended module will appear first in the method lookup path of the object.

All of them are basically methods provided by the `Kernel` module. Every time you use them, you are basically calling them in some scope. All of them will return the scope owner in which it's included, extended or prepended.

Consider a module and a class,

```ruby [>_ IRB Console]
module Foo
  def ping
    "pong"
  end
end

class Bar; end
```

On the class level,

```ruby [>_ IRB Console]
Bar.include Foo #=>  Bar  (instances of Bar will inherit `ping` method)
Bar.extend Foo #=> Bar  (Bar will inherit `ping` method)
Bar.prepend Foo #=> Bar  (instances of Bar will inherit `ping` method, Foo will be added first in the method lookup path of Bar instances)
```

Same logic applies for `singleton` classes as well.

On the object level,

```ruby [>_ IRB Console]
b = Bar.new
b.include Foo #=>  Error: undefined method `include`
b.prepend Foo #=>  Error: undefined method `prepend`
b.extend Foo  #=> #<Bar:0x0000000128f21e70>  (Only the object b will inherit `ping` method)
```

Let's see what it returns on the top level

```ruby [>_ IRB Console]
include Foo #=> Object
extend Foo #=> main
prepend Foo #=> Error: undefined method `prepend`
```

`prepend` strictly works on classes and modules. Since the top level `self` is an object, it will not work at the top level.

Calling `extend` with any module in the top level will return `main` as a return value. `main` is a special object in Ruby. Within its scope only, all of the top level code is executed. So extending `main` with a module will make that module's methods available in `main` (top level execution). This is the expected behavior of `extend`.

Calling `include` with any module in the top level will return `Object` as output. If you read the definition again, you'll notice the abnormality here. `main` is an object. You cannot call `include` method in any other objects in Ruby. But `main` allows it and the module is included in scope of an `Object`, which is everywhere.

In Ruby, everything is an object. By that rule, everything is inherited from `Object`. This is the reason why our method `current_time_in_chicago` was available for all objects, even `nil`. Because even `nil` is an instance of `Object`.

A single one-line mistake can bloat all objects in Ruby, leading to unwanted methods available in all objects. It'll also mess up the method lookup path for all objects and lead to unexpected behaviors like a method that is supposed to call a super method, calling itself (endless recursion). Other nightmares include overriding `to_param` and `method_missing` methods.

You might ask "Using `extend` at the top level is safe, right?". The answer is yes and no. Just because you can, you shouldn't. We are writing an Object-Oriented Program here. So it never makes sense to extend an interface outside of all the objects, not even for code organization or reusability.
