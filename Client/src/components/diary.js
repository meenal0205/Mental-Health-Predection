import React from 'react'
import DiaryEntry from './diary-components/diaryEntry'

let DiaryData = [
  {
    title: "A Cloudy Mind",
    content: "I woke up feeling like the weight of the world was pressing down on my chest. The sunlight tried to peek through the curtains, but I couldn't bring myself to care. Everyone says it's just a phase, but why does it feel endless? My friends don't understand. I don't blame them—they don't see the storm inside me. I wish I could turn it off, even for a moment.",
    date: { year: 2024, month: 11, day: 4 },
    report: {
      importantWords: ["weight", "couldn't", "care", "phase", "blame"],
      urgent: true,
      category: "Depressed",
    }

  },
  {
    title: "Drowning in Silence",
    content: "The silence is deafening.Even when people talk around me, their words feel distant, like they're underwater and I'm on the shore, alone.I went to class today, but I don't remember anything.Smiles are exhausting; pretending is even harder.I wonder if anyone notices how tired I am.",
    date: { year: 2024, month: 11, day: 5 },
    report: {
      importantWords: ["deafening", "distant", "underewater", "alone", "exhausting", "pretending", "tired"],
      urgent: true,
      category: "Anxiety",
    }

  },
  {
    title: "A Flicker of Hope?",
    content: "Today, something small happened—I saw a dog chasing a butterfly in the park. For a second, I smiled without forcing it. It felt strange but nice. Maybe there's still some light in me somewhere. I don't know if I can find it, but that tiny flicker gave me a reason to keep looking.",
    date: { year: 2024, month: 11, day: 8 },
    report: {
      importantWords: ["smile", "light"],
      urgent: false,
      category: "Normal",
    }
  },
  {
    title: "Trapped in the Mirror",
    content: "I looked at myself in the mirror today, and I barely recognized the person staring back. Dark circles, messy hair, hollow eyes. I tried telling myself it's okay, but the words felt empty. Who am I becoming? Will I ever feel whole again?",
    date: { year: 2024, month: 11, day: 10 },
    report: {
      importantWords: ["Trapped", "dark", "messy", "hollow", "tired", "empty"],
      urgent: true,
      category: "Depressed",
    }
  },
]


const Diary = () => {
  return (
    <div>

      <div className='flex relative mb-14'>

        <button className='absolute right-0 shadow-md rounded-md p-2 bg-[#46325D] text-white font-bold'>+ CREATE</button>
      </div>

      <div>
        {DiaryData.map((entry, index) => (

          <DiaryEntry title={entry.title} content={entry.content} date={entry.date} report={entry.report} />
        ))}
      </div>


    </div>
  )
}

export default Diary