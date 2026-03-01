---
title: The Fantastic Modules and How to Use Them
description: "A practical guide to Ruby’s Forwardable, Comparable, Enumerable, and Observable modules — and what they teach us about designing clean, contract-driven mixins."
date: 2026-03-08
tags: ["ruby", "mixins"]
---

Mixins are often misunderstood. Instead of serving as reusable containers for shared behavior and well-defined interfaces, they frequently end up as dumping grounds for logic tightly coupled to a single class.

Ruby has many built-in mixins that serve quite useful purposes. These modules are not only handy, but can also serve as examples of how to design a good mixin.

In this blog, I want to talk about a few such modules:

- [Forwardable](#forwardable)
- [Comparable](#comparable)
- [Enumerable](#enumerable)
- [Observable](#observable)

---

### Forwardable

`Forwardable` is useful when you want the interface on the composed object to be available on the composing object. Unlike other modules in this blog, it needs to be extended rather than included.

Consider an example of a `Card` representing a [Brawlhalla](https://www.brawlhalla.com/) character (_why? Because I play Brawlhalla like a mad lad!_) and `Deck` of those cards:

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

Here we are _delegating_ the methods that are expected on an array to the instance variable `@cards`, which is an actual array, inside the `Deck` object.

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
The first argument of `#def_delegators` doesn't have to be an instance variable; it can also be any method name that returns an object to delegate to.
::

The `Forwardable` module contains methods (i.e. `#def_delegators`, etc) that are meant to be invoked in the scope of a class. These kinds of extendable modules provide behaviors or class-level interfaces that help define an object's interface.

### Comparable

Sometimes when you create a custom class (or custom data type in other languages), you might want to compare two objects of that class. For that, you have to write comparison logic for each operator.

Ruby makes it easier with the `Comparable` module and the spaceship operator `<=>`.

When you include the `Comparable` module in a class and define a method for the `spaceship` operator, any two objects of that class can be compared with any comparison operator.

The result of the `spaceship` operator can be either one of three values: `-1, 0, 1`. -1 means less than, 0 means equal, and 1 means greater than.

::prose-blockquote{type="note"}
When you define a `spaceship` operator for your class, it has to return an `Integer` value. Otherwise when you use a comparison operator on the object of that class, you will get an `ArgumentError`. In Ruby, the `spaceship` operator has already been defined for built-in data types.
::

Coming back to our example, let's say you want to compare characters in the order of `strength` > `defense` (Not that it is how things work in the game, but let's compare the cards this way for the sake of an example).

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

By defining a single `spaceship` operator, the module includes the definition for five different comparison operators (`<`, `>`, `==`, `<=`, `>=`) and even throws in a couple of comparison helpers like `#between?` and `#clamp`.

### Enumerable

The `Enumerable` module is the most useful and my favorite one when it comes to collection classes. It contains all the helpful iterator methods that you would possibly want.

In fact, Ruby’s core collection types `Array` and `Hash` both include `Enumerable`.

```ruby [IRB Console]
Array.ancestors.include? Enumerable   #=> true
Hash.ancestors.include? Enumerable    #=> true
```

For more details on the methods provided by the `Enumerable` module, take a look at the [official documentation](https://ruby-doc.org/core-3.0.1/Enumerable.html).

To use the `Enumerable` module, all you have to do is define the `#each` method for your class and `yield` each element. In our `Deck` class, we already have an `#each` method, which delegates to `@cards` array. This would satisfy the requirement for the `Enumerable` module, but let’s define `#each` ourselves anyway.

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

And that's it. Now, the `Deck` class will have all the enumerable methods that are available for `Array` or `Hash`.

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

The `Observable` module provides a convenient way to implement the **Observer pattern**.

It adds internal state to track whether the object has changed. Based on that state, it provides methods to register observers (`#add_observer`) and notify them (`#notify_observers`).

To use the `Observable` module, you have to require `observer` in your file.

Now let's create a new observable class called `Player` with some game logic:

- Let's say a `Player` can be initialized with a name and deck of cards.
- The player will have a single public interface `brawl` which takes another player as an argument.
- Then, we choose a random card from each player's deck.
- The chosen card's `strength` and `defense` can be used to calculate attack power on the opponent player's card.
- The attack will repeat until either player’s life becomes zero or negative.

The player who still has life will be the winner, and their victory will be announced to the observers!

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

Here, `changed` marks the object as modified, and `notify_observers` broadcasts that change.

::prose-blockquote{type=note}
Notifications are sent only if the observable's state is `changed`. After notifying observers, the `changed` state automatically becomes `false`.
::

In `#after_win_callback`, the player is marked as changed, and relevant details (the player and the chosen card) are sent to all observers.

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

Here, the player defaults to `nil`, so that it can be initialized to track the win counts of all players throughout the game.

Now let's orchestrate them all. First, create the required objects:

```ruby [IRB Console]
require_relative 'player'
require_relative 'win_counts'

thatch = Card.new(name: 'Thatch', strength: 7, defense: 3)
scarlet = Card.new(name: 'Scarlet', strength: 8, defense: 5)
diana = Card.new(name: 'Diana', strength: 5, defense: 5)
lady_vera = Card.new(name: 'Lady Vera', strength: 3, defense: 8)
ransom = Card.new(name: 'Ransom', strength: 7, defense: 3)

deck_one = Deck.new(thatch, scarlet, lady_vera)
deck_two = Deck.new(ransom, diana, scarlet)

player_one = Player.new(name: 'Player One', deck: deck_one)
player_two = Player.new(name: 'Player Two', deck: deck_two)

global_win_counts_tracker = WinCounts.new
player_one_win_counts_tracker = WinCounts.new(player: player_one)
player_two_win_counts_tracker = WinCounts.new(player: player_two)
```

Now add the `WinCounts` tracker as observers to the players and let the brawl begin:

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

Once observers are added to the players, every win triggers `#notify_observers`, which calls `#update` on each tracker.

::prose-blockquote{type="note"}
The notification receiver method does not need to be named `#update`. If you want it to be a different method, you have to specify its name to `#add_observer` method call via `func:` keyword.
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

### Conclusion

All of these modules introduce behavior that isn’t tied to any specific class. Even more interestingly, they don’t implement everything themselves. Instead, they rely on the including class to define the part of the behavior they depend on. This contract-based design is what makes mixins truly powerful.

The best mixins define a minimal contract and remain agnostic about their host. The moment a module assumes knowledge of a specific class, it stops being a mixin and starts being misplaced logic.

Ruby’s standard library shows us the difference. The real question is whether we follow that example.
