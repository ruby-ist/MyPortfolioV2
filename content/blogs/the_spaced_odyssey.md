---
title: The Space-d Odyssey
description: Journey of creating spaced repetition in mobile first offline PWA
date: 2026-06-10
tags: ["vue.js", "nuxt.js", "PWA"]
---

### Me, Movies and Foreign Languages

I used to watch a lot of English movies and series through out my childhood and that's what mostly helped me to learn that language fundamentally (My first language is [Tamil / தமிழ்](https://en.wikipedia.org/wiki/Tamil_language){:target="\_blank"}).

But then about the start of my college days, I started watching Japanese anime with English subtitles. Fast forward to one and half year ago, more than 50% of stuffs in my watch history and watch list is an anime. But still I didn't know Japanese enough to read a sentence or watch the anime without English subtitles. That's when and why I started the Japanese course on Duolingo.

Duolingo was really good place to start practising different language with all its game-like theme and consistent pushing for streak maintenance. I was learning in steady progress, learned hiragana and katakana quickly, practised around 1000 words and 100 kanji. Even though the progress is slow and mostly about words (_not enough grammars_), it was good and the learning is consistent. But then, they [updated their course](https://www.reddit.com/r/duolingo/comments/1s4d3qn/heads_up_round_2_increased_rollout_to_rebuilt/){:target="\_blank"}.

Lot of words and Kanji that I didn't know came appearing in my regular practice session like I already learned them and making it not fun anymore. There were lot of criticism about it in the internet but they didn't provide any way to rollback to the previous progress. That's when my daily progress went haywire.

Even before their course update, I was already looking for an companion app along with duolingo to learn more kanji characters and grammar. That's how I learned about the anki-cards and [spaced repetition](https://en.wikipedia.org/wiki/Spaced_repetition){:target="\_blank"}. It is an amazing concept and I was fully intrigued by it, at the same time, felt bad that I didn't discover it sooner. The anki flashcards is also fully utilising the concept but it just didn't sit right with me. Mainly because I didn't want to use a decade old User interface and was looking for more of companion app along with my duolingo progress instead of do-over.

But their course update finally made me built a new one myself and I created [Rebmemer](https://rebmemer.onrender.com){:target="\_blank"}, a mobile centric PWA for learning new words and Kanji with Spaced repetition, works completely offline with best UI I can cook, where data can be easily imported and exported.

### TL;DR

Started learning Japanese using Duolingo after watching dozens of anime, they updated their course to gaslight me new words instead of teaching them. Learned about [spaced repetition](https://en.wikipedia.org/wiki/Spaced_repetition){:target="\_blank"} but decided hell nah for Anki UI. Created my own offline PWA for space repetition named [Rebmemer](https://rebmemer.onrender.com){:target="\_blank"}.

---

### Odyssey to Rebmemer

Rebmemer, named after a spell used in the movie [Justice League Dark: Apokoplips War](https://www.imdb.com/title/tt11079148/){:target="\_blank"}, is built with Nuxt.js and [Dexie](https://dexie.org/){:target="\_blank"} for accessing the Indexed DB. I've built a similar offline PWA in the past, named [Local Ledger](https://local-ledger.onrender.com){:target="\_blank"}, for expanse tracking so most of the things were easy this time.

I wanted an app where everything can be configurable, offline, which should have one type of input to **type** words and another type of input (_like canvas_) to **draw** them (_for kanji characters_). The drawing feature was the one of the thing I felt missing by default in Anki cards, but in their defense Anki is a general app and most of the language and flash cards might not need a drawable canvas. But I needed very badly.

After coming up with the list of features, I started my design in Figma. During that time, Google's Stitch AI was getting it's hype and I explored it a little bit, but the design it munched up was not what I had in mind. I felt more productive designing what I had in mind with Figma than promting it to Stitch. So, I continued the design in Figma.

After completing the wireframe model, I had to choose the color palatte. This is always the hardest part of designing for me. Usually, I choose one or pair of similar palatte from website like [ColorHunt.co](https://colorhunt.co){:target="\_blank"}. But this time, I took a different path and used a color palatte of [soul fire](https://brawlhalla.fandom.com/wiki/Soul_Fire){:target="\_blank"} skins from Brawlhalla game (_See! good things does come from playing games like a madlad_).

After that, features, designs, colors and fonts were all ready. Only thing left to do is coding. But it was the time of Use-AI-to-Code-Or-Be-Treated-Like-Caveman. I had already started using Agentic AI with [Zed](https://zed.dev/){:target="\_blank"} at work. So, I swallowed a hard pill and decided to code with AI.

But the reality was much different. At work, the AI was paid by my organization for me to use it. But I cannot legally use it for my personal projects. So I wanted an AI which is free and can communicate with my code editor. Among the big three, GPT and Claude models cannot be used without a paid API key. Google being generous, gives Gemini's API key for free with limitations. But the credits that comes on that free plan will exhaust before I would finish my landing page.

Coding-with-AI is not an option for developer who is trying to built a project with free of cost. So, I started developing the projects how I developed projects for last 5 years, on my own. But that doesn't mean, I didn't use AI at all.

A project can easily be broken down into multiple different problems or to-do lists. Some of them may be new to you. Some of them you may already know how to do. But then there are some problems, which you know how to do but don't want to do it because it is boring and you are lazy (Like, custom ellipses generator or function to read and parse the contents of given input file). For those things, you don't need an API key or an Agentic AI integrated environment to ask the AI to generate the solutions. In such scenarios, I utilized the normal chat AIs.

Apart from that, I coded everything that I could enjoy. For most of the problems that came developing this app, I already knew the solutions from the experience of my previous app and I've easily coded them. Couple of problems that was new to me was, using Canvas to create a drawing board and implementing the spaced repetition algorithm. AI helped me figure out those areas as well. Finding out a right formula for spaced repetition took more prompting than I could accept, but it was necessary as it was for the core functionality of the App. The formula is documented on the [readme](https://github.com/ruby-ist/rebmemer){:target="\_blank"} page of the project.

Now about the functionality of the app, it is very much like Anki but with an upgraded UI. You'll first create a deck with name, description and image (_image can also be stored on indexed DB!!_). You can configure the learning setting if you want or leave it as it is. Then you can bulk import new cards or add them one by one as you learn them and start practising them. There's also an option to reverse the deck and you can practice them inversely (_like question from answer_).

For me, I crawled all the words I've learned from Duolingo, parsed them and imported them to the app as cards with zero familarity (_as newly learned cards_). It would take some practices to catch up on them but that is fine for me.

This was my journey of developing a new project in AI era and building something to learn a new language. I feel fulfilled that it is helping me learn and practice new things everyday.
