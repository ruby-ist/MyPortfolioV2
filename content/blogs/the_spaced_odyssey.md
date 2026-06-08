---
title: The Space-d Odyssey
description: Journey of creating spaced repetition in mobile first offline PWA
date: 2026-06-10
tags: ["vue.js", "nuxt.js", "PWA"]
---

### Me, Movies, Series, and Foreign Languages

I used to watch a lot of English movies and series throughout my childhood, and that’s what primarily helped me learn the language (My first language is [Tamil / தமிழ்](https://en.wikipedia.org/wiki/Tamil_language){:target="\_blank"}).

But then about the start of my college days, I started watching Japanese anime with English subtitles. Fast forward to one and a half years ago, and more than 50% of the stuff in my watch history and watchlist was anime. But I still didn't know enough Japanese to read a sentence or watch the anime without English subtitles. That's when and why I started the Japanese course on Duolingo.

Duolingo was a really good place to start practising a new language with its game-like theme and constant push to maintain a streak. I was making steady progress, learned hiragana and katakana quickly, practiced around 1000 words and 100 kanji. Even though the progress is slow and mostly about words (_not enough grammar_), it was good and the learning is consistent. But then, they [updated their course](https://www.reddit.com/r/Duolingo/comments/1s4d3qn/heads_up_round_2_increased_rollout_to_rebuilt/){:target="\_blank"}.

A lot of words and kanji that I didn’t know suddenly started appearing in my regular practice sessions as if I had already learned them, which made it a lot less fun. There was a lot of criticism about it on the internet but they didn't provide any way to roll back to the previous progress. That's when my daily progress went haywire.

Even before the course update, I was already looking for a companion app along with Duolingo to learn more kanji characters and grammar. That's how I learned about the Anki flashcards and [spaced repetition](https://en.wikipedia.org/wiki/Spaced_repetition){:target="\_blank"}. It is an amazing concept, and I was fully intrigued by it. At the same time, I felt bad that I hadn’t discovered it sooner. Anki flashcards also fully utilize the concept but it just didn't sit right with me. Mainly because I didn't want to use a decade old User interface and was looking for more of a companion app along with my Duolingo progress instead of a do-over.

But their course update finally made me build one myself and I created [Rebmemer](https://rebmemer.onrender.com){:target="\_blank"}, a mobile-centric PWA for learning new words and kanji with spaced repetition that works completely offline with the best UI I could cook up, where data can be easily imported and exported.

### TL;DR

Started learning Japanese using Duolingo after watching dozens of anime, they updated their course to gaslight me with new words instead of teaching them. Learned about [spaced repetition](https://en.wikipedia.org/wiki/Spaced_repetition){:target="\_blank"} but decided hell nah for Anki UI. Created my own offline PWA for spaced repetition named [Rebmemer](https://rebmemer.onrender.com){:target="\_blank"}.

---

### Odyssey to Rebmemer

Rebmemer, named after a spell used in the movie [Justice League Dark: Apokolips War](https://www.imdb.com/title/tt11079148/){:target="\_blank"}, is built with Nuxt.js and [Dexie](https://dexie.org/){:target="\_blank"} for accessing the IndexedDB. I've built a similar offline PWA in the past, named [Local Ledger](https://local-ledger.onrender.com){:target="\_blank"}, for expense tracking so most of the things were easy this time.

I wanted an app that was fully configurable and offline, with one type of input to **type** words and another type of input (_like canvas_) to **draw** them (_for kanji characters_). The drawing feature was one of the things I felt missing by default in Anki flashcards, but in their defense Anki is a general app and most of the language and flash cards might not need a drawable canvas. But I needed it badly.

After coming up with the list of features, I started my design in Figma. During that time, Google's Stitch AI was getting its hype and I explored it a bit, but the design it munched up was not what I had in mind. I felt more productive designing what I had in mind with Figma than prompting it to Stitch. So, I continued the design in Figma.

After completing the wireframe model, I had to choose the color palette. This is always the hardest part of designing for me. Usually, I choose one or a pair of similar palettes from website like [ColorHunt.co](https://colorhunt.co){:target="\_blank"}. But this time, I took a different path and used a color palette inspired by the [Soul Fire](https://brawlhalla.fandom.com/wiki/Soul_Fire){:target="\_blank"} skins from the Brawlhalla game (_See! good things do come from playing games like a madlad_).

After that, features, designs, colors and fonts were all ready. The only thing left to do was coding. But it was the time of Use-AI-to-Code-Or-Be-Treated-Like-Caveman. I had already started using Agentic AI with [Zed](https://zed.dev/){:target="\_blank"} at work. So, I swallowed a hard pill and decided to code with AI.

But the reality was much different. At work, the AI was paid by my organization for me to use it. But I cannot legally use it for my personal projects. So I wanted an AI which is free and can communicate with my code editor. Among the big three, GPT and Claude models cannot be used without a paid API key. Google, being generous, gives Gemini's API keys for free with limitations. But the credits that come with the free plan would run out long before I could finish even the landing page.

Coding with AI isn’t really an option for a developer trying to build a project at no cost. So, I started building it the same way I’ve built my projects for the last five years: on my own. But that doesn't mean I didn't use AI at all.

A project can easily be broken down into multiple different problems or to-do lists. Some of them may be new to you. Some of them you may already know how to solve. But then there are the problems you know how to solve, yet don’t want to work on because they’re boring and you’re lazy (like a text truncation function or a function to read and parse the contents of an input file).

For those kinds of problems, I used to grab ready-to-paste solutions from Stack Overflow. Now I ask the free versions of the big three AIs to generate them instead, because they're probably trained on the same Stack Overflow answers anyway.

Apart from that, I coded everything that I could enjoy. For most of the problems that came while developing this app, I already knew the solutions from the experience of my previous app and I've easily coded them. A couple of problems that were new to me were, using the Canvas API to create a drawing board and implementing the spaced repetition algorithm. AI helped me figure out those areas as well. Finding the right formula for spaced repetition took more prompting than I could accept, but t was necessary because it forms the core functionality of the app. The formula is documented on the [README](https://github.com/ruby-ist/rebmemer){:target="\_blank"} page of the project.

Now about the functionality of the app, it is very much like Anki but with an upgraded UI. You'll first create a deck with a name, description, and image (_image can also be stored in indexedDB!!_). You can configure the learning settings if you want or leave it as it is. Then you can bulk import new cards or add them one by one as you learn them and start practising them. There's also an option to reverse the deck and you can practice them in reverse (_like finding the question from answer_).

For me, I crawled all the words I've learned from Duolingo, parsed them, and imported them to the app as cards with zero familiarity (_as newly learned cards_). It would take some practice to catch up on them but that is fine for me.

This was my journey of developing a new project in the AI era and building something to learn a new language. I feel fulfilled knowing that it’s helping me learn and practice new things every day.
