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

Consider an example of `Card` of [Brawlhalla](https://www.brawlhalla.com/) characters (_why? Because I play Brawlhalla like a mad lad!_) and `Deck` of those cards:

```ruby [card.rb]
class Card
  attr_reader :name, :strength, :defense

  def initialize(name:, strength:, defense:)
    @name = name
    @strength = strength
    @defense = defense
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

Here we are _delegating_ the methods that is expected on an array to the instance variable `@cards`, which is an actual array, inside the `Deck` object.

By doing so, we can call the delegated method directly on the `Deck` object instead of chaining method calls.

```ruby [IRB Console]
require_relative 'deck'

deck = Deck.new

deck << Card.new(name: 'Thatch', strength: 7, defense: 3)
deck << Card.new(name: 'Scarlet', strength: 8, defense: 5)
deck << Card.new(name: 'Diana', strength: 5, defense: 5)

pp deck.count                     #=> 3
pp deck[0]                        #=> <Card:0x0000000125221a20 @defense=3, @name="Thatch", @strength=7>
deck.each { print "#{_1.name} " } #=> Thatch Scarlet Diana
```

::prose-blockquote{type="note"}
The first argument of `#def_delegators` doesn't have to be instance variables but can also be any method name that returns an object to delegate to.
::

The `Forwardable` module contains methods (i.e. `#def_delegators`, etc) that is meant to be invoked in the scope of a class. These kind of extendable modules can provide a behaviors or class interfaces that helps to define the interface for the objects.

### Comparable

Sometimes when you create a custom class (or custom data type in other languages), you might want to compare two object of that class. For that you have to write comparision logic that answers for each comparison operators.

Ruby makes it easier with the `Comparable` module and the spaceship operator `<=>`.

When you include the `Comparable` module on a class and define a method for the `spaceship` operator, any two objects of that class can be compared with any comparison operator.

The result of the `spaceship` operator can either be of three value: `-1, 0, 1`. The negative one means lower self value, positive zero means equal and one means greater self value.

::prose-blockquote{type="note"}
When you define a `spaceship` operator for your class, it has to return an `Integer` value. Otherwise when you use a comparison operator on the object of that class, you will get an `ArgumentError`. In ruby, the `spaceship` operator has already been defined for the built-in data types.
::

Coming to our example, let's say you want to compare the character in a order of `strength` > `dexterity` (Not that it is how things works in the game, but let's compare the cards this way for the sake of an example).

We can modify our `Card` class so that it defines such comparison logic.

```ruby [card.rb]
class Card
  include Comparable
  attr_reader :name, :strength, :defense

  def initialize(name:, strength:, defense:)
    @name = name
    @strength = strength
    @defense = defense
  end

  def <=>(other)
    return strength <=> other.strength unless (strength <=> other.strength).zero?

    defense <=> other.defense
  end
end
```

```ruby [IRB Console]
require_relative 'card'

thatch = Card.new(name: 'Thatch', strength: 7, defense: 3)
scarlet = Card.new(name: 'Scarlet', strength: 8, defense: 5)
diana = Card.new(name: 'Diana', strength: 5, defense: 5)

pp thatch < scarlet   #=> true
pp thatch <= scarlet  #=> true
pp thatch > scarlet   #=> false
pp thatch >= scarlet  #=> false
pp thatch == scarlet  #=> false
pp thatch == thatch   #=> true
pp thatch > diana     #=> true
```

By defining single `spaceship` operator, the module includes the definition for five different comparison operators (`<`, `>`, `==`, `<=`, `>=`) and even throws in couple of comparison helpers like `#between?` and `#clamp`.

::prose-blockquote{type="note"}
The not-equal-to operator (`!=`) will not use the `spaceship` operator even when you include the `comparable` module. It'll still return false when you check the two diffrent `Card` object with same stats. It'll only return false when both of the operands are **same object**.
::

### Enumerable

The `Enumerable` module is the most useful and my favorite one when it comes to collection like classes. It contains all the helpful iterator methods that you would possibly want.

In fact, our core collection type `Array` and `Hash` both inherits the iteratable methods from `Enumerable` module only.

```ruby [IRB Console]
Array.ancestors.include? Enumerable   #=> true
Hash.ancestors.include? Enumerable    #=> true
```

For more details on the methods provided by the `Enumerable` module, take a look at the [official docs](https://ruby-doc.org/core-3.0.1/Enumerable.html).

To use an `Enumerable` module, all you have to do is define the `#each` method for your class and `yield` an iterated item. In our `Deck` class, we already have an `#each` method, which delegates to `@cards` array. This would satisfy the condition for `Enumerable` module but let's define the `#each` method on our own anyway.

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

deck << Card.new(name: 'Thatch', strength: 7, defense: 3)
deck << Card.new(name: 'Scarlet', strength: 8, defense: 5)
deck << Card.new(name: 'Diana', strength: 5, defense: 5)

pp deck.filter { _1.defense > 3  }.count  #=> 2
pp deck.map { _1.name }                   #=> ["Thatch", "Scarlet", "Diana"]
pp deck.find { _1.name == 'Thatch' }      #=> #<Card:0x0000000124d7f918 @defense=3, @name="Thatch", @strength=7>
```

### Observable

The `Observable` module is handy way to implement the **Observer pattern** from the design patterns.

This module adds a state to your object which is used to track if the object is changed or not and based on that state, it also provides interfaces to add observers to that object (`#add_observer`) and method to notify those observers (`#notify_observers`) too.

To you use the `Observable` module, you have to require the `observer` in your file.

Now let's create new observable class called `Player` with some game logic:

- Let's say a `Player` can be initialized with a name and deck of cards.
- The player will have a single public interface `brawl` which takes another player as an argument.
- Then, we choose a random card from each player's deck.
- The chosen card's character's `strength` and `defense` can be used to calculate attack power on the opponent player's card.
- The attack will repeat until either one of the player's life becomes zero or negative.

The player who still has life will be the winner and his victory will be announced to be observers!

```ruby [player.rb]
require_relative 'deck'
require 'observer'

class Player
  include Observable

  attr_reader :name, :deck

  def initialize(name:, deck:)
    @name = name
    @deck = deck
    @life = 200
  end

  def brawl(opponent)
    prep_fight(opponent)
    attack(opponent) until life <= 0 || opponent.life <= 0

    declare_result(opponent)
  end

  private

  def prep_fight(opponent)
    self.life = 200
    opponent.life = 200
    choose_card!
    opponent.choose_card!
  end

  def attack(opponent)
    attack_power = charge_attack
    opponent_attack_power = opponent.charge_attack

    if attack_power > opponent_attack_power
      opponent.decrease_life(attack_power)
    elsif attack_power < opponent_attack_power
      decrease_life(opponent_attack_power)
    else
      opponent.decrease_life(attack_power)
      decrease_life(opponent_attack_power)
    end
  end

  def declare_result(opponent)
    if life.positive?
      after_win_callback
      "#{name} wins"
    elsif opponent.life.positive?
      opponent.after_win_callback
      "#{opponent.name} wins"
    else
      'Match tied'
    end
  end

  protected

  attr_accessor :life

  def choose_card!
    @chosen_card = deck.sample
  end

  def charge_attack
    10 * (Random.rand(@chosen_card.strength) + 1)
  end

  def decrease_life(attack_power)
    self.life -= attack_power * (1 - @chosen_card.defense / 100.0)
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
The notification will only happen if the observable's state is `changed`. After notifying the observers the `changed` state will automatically becomes `false`.
::

In the `#after_win_callback` method, the player's state is changed and that change along with some other data like player details and card details is broadcasted to all the observers.

However, to listen to that notification, we need some more classes. Consider the class `WinCounts` which tracks how many times a character has won:

```ruby [win_counts.rb]
class WinCounts
  attr_reader :counts

  def initialize(player: nil)
    @player = player
    @counts = Hash.new(0)
  end

  def update(player, card)
    return if !@player.nil? && player != @player

    @counts[card.name] += 1
  end
end
```

Here, we have the default argument for player as `nil`, so that it can be initialized to track the win counts of all players throughout the game.

Now let's orchestrate them all. First, Create a necessary objects:

```ruby [IRB Console]
require_relative 'player'
require_relative 'win_counts'

thatch = Card.new(name: 'Thatch', strength: 7, defense: 3)
scarlet = Card.new(name: 'Scarlet', strength: 8, defense: 5)
diana = Card.new(name: 'Diana', strength: 5, defense: 5)
lady_vera = Card.new(name: 'Lady Vera', strength: 6, defense: 3)
ransom = Card.new(name: 'Ransom', strength: 6, defense: 3)

deck_one = Deck.new(thatch, scarlet, lady_vera)
deck_two = Deck.new(ransom, diana, scarlet)

player_one = Player.new(name: 'Player One', deck: deck_one)
player_two = Player.new(name: 'Player Two', deck: deck_two)

global_win_counts_tracker = WinCounts.new
player_one_win_counts_tracker = WinCounts.new(player: player_one)
player_two_win_counts_tracker = WinCounts.new(player: player_two)
```

Now add the `WinCounts` tracker as observers to the players and lets the brawl begin:

```ruby [IRB Console]
player_one.add_observer(global_win_counts_tracker)
player_two.add_observer(global_win_counts_tracker)
player_one.add_observer(player_one_win_counts_tracker)
player_two.add_observer(player_two_win_counts_tracker)

10.times { puts player_one.brawl(player_two) }

puts "Overall Wins: #{global_win_counts_tracker.counts}"
puts "Player One Wins: #{player_one_win_counts_tracker.counts}"
puts "Player Two Wins: #{player_two_win_counts_tracker.counts}"
```

Once we added the observers to players, each time they win, the `#notify_observers` method will call the `#update` method on tracker objects.

::prose-blockquote{type="note"}
The notification receiver method need not to be a method named `#update`. If you want it to be a different method, you have to specify its name to `#add_observer` method call via `func:` keyword.
::

Based on how the game went, the output would be something like this:

```csv [Output]
Player Two wins
Player One wins
Player Two wins
Player One wins
Player One wins
Player Two wins
Player Two wins
Player One wins
Player Two wins
Player One wins
Overall Wins: {"Scarlet" => 7, "Ransom" => 1, "Thatch" => 1, "Diana" => 1}
Player One Wins: {"Scarlet" => 4, "Thatch" => 1}
Player Two Wins: {"Scarlet" => 3, "Ransom" => 1, "Diana" => 1}
```

(_Yes, my girl Scarlet is OP_)

All of these module brings in lot of interfaces that is not tied up to any of the classes. Even more interesting thing is that they don't have all the logic themselves, instead they rely on mixed-in class to define the part of the logic as a way of communicating with those objects. This kind of communicatable interfaces is what makes mixins truly powerful.
