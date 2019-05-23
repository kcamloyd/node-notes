const fs = require('fs')
const chalk = require('chalk')

const loadNotes = () => {
    try {
        const dataJSON = fs.readFileSync('notes.json').toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const listNotes = () => {
    const notes = loadNotes()
    if (notes.length > 0) {
        console.log(chalk.bgBlue('Your notes'))
        notes.forEach(note => console.log(note.title))
    } else {
        console.log(chalk.bgRed('No notes present'))
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if (note) {
        console.log(chalk.bgBlue(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.bgRed('Note not found'))
    }
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({title, body})
        saveNotes(notes)
        console.log(chalk.bgGreen('New note added'))
    } else {
        console.log(chalk.bgRed('Note title taken!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const removeNote = (title) => {
    const notes = loadNotes()
    const keptNotes = notes.filter((note) => note.title !== title)

    if (notes.length > keptNotes.length) {
        console.log(chalk.bgGreen('Note removed'))
        saveNotes(keptNotes)
    } else {
        console.log(chalk.bgRed('No note found'))
    }
}

module.exports = {
    addNote,
    listNotes,
    readNote,
    removeNote
}