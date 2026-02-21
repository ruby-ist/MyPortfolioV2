---
title: Behavioral Mixins
description: "Learn about modules like Forwardable, Comparable, Enumerable and Observable in Ruby"
date: 2026-03-08
tags: ["ruby", "mixins"]
---

Mixins are often misused. Instead of being a module where a sharable behaviour and interface can exist, they often became a module created only to store interfaces tied up to a specific class.

Ruby has many in-built mixins that serve a quite useful use cases. These modules not only handy, but can be used to study how one should define a mixin.

In this blog, I want to talk about few of such modules:

- [Forwardable](#forwardable)
- [Comparable](#comparable)
- [Enumerable](#enumerable)
- [Observable](#observable)

---

### Forwardable

`Forwardable` is useful when you want the interface of the composed object to be available on composing object. Unlike other modules, this need to be mixed with `extend` instead of `include`.

Consider an example of `Card` of [Brawlhalla](https://www.brawlhalla.com/) characters and `Deck` of those characters:

```ruby [card.rb]
class Card
  attr_reader :name, :strength, :defense, :dexterity, :speed

  def initialize(name:, strength:, defense:, dexterity:, speed:)
    @name = name
    @strength = strength
    @defense = defense
    @dexterity = dexterity
    @speed = speed
  end
end
```

```ruby [deck.rb]
require_relative 'card'

class Deck
  extend Forwardable

  def_delegators :@cards, :each, :<<, :[], :[]=, :count, :sample

  def initialize(*cards)
    @cards = cards
  end
end
```

```ruby [IRB Console]
require_relative 'deck'

deck = Deck.new

deck << Card.new(name: 'Thatch', strength: 4, defense: 5, dexterity: 6, speed: 7)
deck << Card.new(name: 'Scarlet', strength: 8, defense: 7, dexterity: 6, speed: 5)
deck << Card.new(name: 'Diana', strength: 6, defense: 3, dexterity: 8, speed: 6)

pp deck.count             #=> 3
pp deck[0]                #=> #<Card:0x0000000129967178 @defense=5, @dexterity=6, @name="Thatch", @speed=7, @strength=4>
deck.each { pp _1.name }  #=> "Thatch", "Scarlet", "Diana"
```

Here we are _delegating_ the methods that is expected on an array to the instance variable `@cards`, which is an actual array, inside the `Deck` class.

The first argument of `#def_delegators` doesn't have to be instance variables but can also be any method name that returns an object to delegate to.

::prose-blockquote{type="note"}
The `Forwardable` module contains methods (i.e. `#def_delegators`, etc) that is meant to be invoked in the scope of a class. These kind of extendable modules can provide a behaviors or class interfaces that helps to define the interface for the objects.
::

### Comparable

Sometimes when you create a custom class (or custom data type in other languages) you might want to compare two object of that class. For that you have to write comparision logic that answers for each comparison operators.

Ruby makes it easier with `Comparable` module and the `<=>` operator.

When you include the `Comparable` module on a class and define a method for the `spaceship` operator, any two objects of that class can be compared with any comparison operator.

The result of the `spaceship` operator can either be of three value: `-1, 0, 1`. The negative one means lower self value, zero means equal and one means greater value.

::prose-blockquote{type="note"}
When you define a `spaceship` operator for your class, it has to return an `Integer` value. Otherwise when you use a comparison operator on the object of that class, you will get an `ArgumentError`. In ruby, the `spaceship` operator has already been defined for the built-in data types.
::

Coming to our example, let's say you want to compare the character in a order of `strength` > `speed` > `dexterity` > `defense` (Not that it is how things works in the game, but let's compare it this for the sake of an example).

We can modify our `Card` class so that it defines such comparison logic.

```ruby [card.rb]
class Card
  include Comparable
  attr_reader :name, :strength, :defense, :dexterity, :speed

  def initialize(name:, strength:, defense:, dexterity:, speed:)
    @name = name
    @strength = strength
    @defense = defense
    @dexterity = dexterity
    @speed = speed
  end

  def <=>(card)
    return strength <=> card.strength unless (strength <=> card.strength).zero?
    return speed <=> card.speed unless (speed <=> card.speed).zero?
    return dexterity <=> card.dexterity unless (dexterity <=> card.dexterity).zero?
    return defense <=> card.defense
  end
end
```

```ruby [IRB Console]
require_relative 'card'

thatch = Card.new(name: 'Thatch', strength: 4, defense: 5, dexterity: 6, speed: 7)
scarlet = Card.new(name: 'Scarlet', strength: 8, defense: 7, dexterity: 6, speed: 5)
diana = Card.new(name: 'Diana', strength: 6, defense: 3, dexterity: 8, speed: 6)

pp thatch < scarlet
pp thatch <= scarlet
pp thatch > scarlet
pp thatch >= scarlet
pp thatch == scarlet
pp thatch != scarlet
pp thatch == thatch
pp thatch > diana
```

### Enumerable

The `Enumerable` module is the most useful and my favorite one when it comes to collection like classes. It contains all the helpful iterator methods that you would possibly want.

In fact, our core collection type `Array` and `Hash` both inherits the iteratable methods from `Enumerable` module only.

```ruby [IRB Console]
Array.ancestors.include? Enumerable   #=> true
Hash.ancestors.include? Enumerable    #=> true
```

For more details on the methods provided by the `Enumerable` module, take a look at the [official docs](https://ruby-doc.org/core-3.0.1/Enumerable.html).

To use an `Enumerable` module, all you have to do is define the `#each` method for your class and `yield` an iterated item. In our `Deck` class, we already have an `#each` method, which delegates to `@cards` array. This would satisfy the condition for `Enumerable` module but let's say define the `#each` method on our own anyway.

```ruby [deck.rb]
require_relative 'card'

class Deck
  extend Forwardable
  include Enumerable

  attr_reader :cards

  def_delegators :cards, :<<, :[], :[]=, :count, :sample

  def initialize(*cards)
    @cards = cards
  end

  def each
    cards.each do |item|
      yield item
    end
  end
end
```

And that's it. Now, the `Deck` class will have all the enumerable methods that is available for `Array` or `Hash`.

```ruby [IRB Console]
require_relative 'deck'

deck = Deck.new

deck << Card.new(name: 'Thatch', strength: 4, defense: 5, dexterity: 6, speed: 7)
deck << Card.new(name: 'Scarlet', strength: 8, defense: 7, dexterity: 6, speed: 5)
deck << Card.new(name: 'Diana', strength: 6, defense: 3, dexterity: 8, speed: 6)

deck.filter { _1.speed > 6 }
deck.map { _1.name }
deck.find { _1.name == 'Thatch' }
```

### Observable

The `Observable` module is handy way to implement the **Observer pattern** from the design patterns.

This module adds a state to your object which is used to track if the object is changed or not. Based on that, it also provides a interface to add observers to current object (`#add_observer`) and to notify those observers `#notify_observers`.

Now let's new observable class callded `Player`

```ruby [player.rb]
class Player
  include Observable

  attr_reader :name, :deck

  def initialize(name:, deck:)
    @name = name
    @deck = deck
  end

  def brawl(opponent)
    result = chosen_card <=> opponent.chosen_card
    case
    when 1
      after_win_callback
      "#{name} wins"
    when -1
      opponent.after_win_callback
      "#{player.name} wins"
    else
      "Match tied"
    end
  end

  protected

  def chosen_card
    @chosen_card = deck.sample
  end

  def after_win_callback
    return if @chosen_card.nil?

    changed
    notify_observers(self, @chosen_card)
  end
end
```

Here we are using the `changed` and `notify_observers` methods to track the change in object and notify that change to observers.

::prose-blockquote{type=note}
The notification will only happen if the observable's state is changed. After notifying the observers the changed state will automatically becomes `false`.
::

However, to listen to that notification, we need more classes. Consider the class `WinCounts`:

```ruby [win_counts.rb]
class WinCounts
  attr_reader :counts

  def initialize(player: nil)
    @player = player
    @counts = Hash.new(0)
  end

  def update(player, card)
    return unless player.nil? || player == @player
    @counts[card.name] += 1
  end
end
```

Now let's orchestrate them all. Create a necessary objects:

```ruby [IRB Console]
require_relative 'deck'
require_relative 'player'
require_relative 'player_wins_count'
require_relative 'global_wins_count'

thatch = Card.new(name: 'Thatch', strength: 4, defense: 5, dexterity: 6, speed: 7)
scarlet = Card.new(name: 'Scarlet', strength: 8, defense: 7, dexterity: 6, speed: 5)
diana = Card.new(name: 'Diana', strength: 6, defense: 3, dexterity: 8, speed: 6)
lady_vera = Card.new(name: 'Lady Vera', strength: 6, defense: 3, dexterity: 8, speed: 6)
ransom = Card.new(name: 'Ransom', strength: 6, defense: 3, dexterity: 8, speed: 6)

deck_one = Deck.new(thatch, scarlet, lady_vera)
deck_two = Deck.new(ransom, diana, scarlet)

player_one = Player.new(name: 'Player One', deck: deck_one)
player_two = Player.new(name: 'Player Two', deck: deck_two)

global_wins_count = GlobalWinsCount.new
player_one_wins_count = PlayerWinsCount.new(player: player_one)
```

Now add observers and lets the brawl begin:

```ruby [IRB Console]
player_one.add_observer(global_wins_count)
player_one.add_observer(player_one_wins_count)

player_one.brawl(player_two)

pp global_wins_count.counts
pp player_one_wins_count.counts
```

Once we added the `global_wins_count` and `player_one_wins_count` as observers to player one, the `#notify_observers` method call on player_one will call the `#update` method on those two objects.

The notification receiver method need not to be a method named `#update`. If you want it to be a different method, you have to specify its name to `#add_observer` method call via `func:` keyword.

Conclusion?
