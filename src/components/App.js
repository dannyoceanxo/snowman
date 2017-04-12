import React, { Component } from 'react'
import _ from 'lodash'
import LetterButton from './LetterButton'
import Snowman from './Snowman'
import Word from './Word'
import PlayAgainButton from './PlayAgainButton.js'

// ALPHABET is an array of 26 letters, 'a' through 'z', i.e. ['a', 'b', 'c', ...'z']
const ALPHABET = _.range(26).map(i => String.fromCharCode(i + 97))

// WORDS is an array of 1024 different seven letter words
const WORDS = require('raw!../wordList.txt').trim().split('\n')

class App extends Component {
  state = {
    guesses: [],
    word: _.sample(WORDS)
  }

  choose (letter) {
    // ToDo
    console.log('You clicked', letter)
    this.setState({
      guesses: [...this.state.guesses, letter]
    })
  }

  reset = () => {
    this.setState({
      guesses: [],
      word: _.sample(WORDS)
    })
  }

  get points () {
    // ToDo
    return this.state.word.split('').filter((letter) => {
      return this.state.guesses.includes(letter)
    }).length
  }

  render () {
    return <div className='app'>
      <main>
        <Snowman step={this.points} size={400} />
        {/* TODO */}
        <Word value={this.state.word} guesses={this.state.guesses} />
        <div className='keyboard'>
          {ALPHABET.map((letter) =>
            <LetterButton
              value={letter}
              onChoose={() => this.choose(letter)}
              disabled={false}
              key={letter} />
          )}
        </div>
        <PlayAgainButton reset={this.reset} />
      </main>
      <footer>It's like hangman, but, um... backwards or something</footer>
    </div>
  }
}

export default App
