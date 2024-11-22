import React from 'react'
import { Icon } from '@iconify/react/dist/iconify.js';

function getMonthNameFromDate(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString("default", { month: "short" });
}

function sliceByWords(input, maxLength) {
    if (input.length <= maxLength) return input;

    const sliced = input.slice(0, maxLength);
    const lastSpaceIndex = sliced.lastIndexOf(" ");
    return lastSpaceIndex !== -1 ? sliced.slice(0, lastSpaceIndex) : sliced;
}

const icons = {
    "Depression": "fluent-emoji:disappointed-face",
    "Anxiety": "fluent-emoji:worried-face",
    "Normal": "fluent-emoji:slightly-smiling-face",
    "Personality Disorder": "fluent-emoji:face-with-spiral-eyes",
    "Stress": "fluent-emoji:tired-face",
    "Suicidal": "fluent-emoji:sad-but-relieved-face",
    "Bipolar": "fluent-emoji:face-in-clouds"
}

function DiaryEntry({ title, content, date, sentiment }) {

    return (
        <div className='flex gap-x-3 bg-white shadow-md rounded-md border-transparent mb-5 h-fit p-4 font-mono'>
            <div className='flex flex-col justify-center mx-4 border-r-2 border-gray-300 pr-5 text-'>
                <p className='mx-auto text-2xl font-bold '>{date.split(" ")[1]}</p>
                <p>{date.split(" ")[2]}</p>

            </div>
            <div className=' mx-4 border-r-2 border-gray-300 pr-5 '>
                <h2 className='font-semibold mb-1'>{title}</h2>
                <p className='text-sm'>{content} </p>
            </div>
            <div className='my-auto'>
                <Icon icon={`${icons[sentiment]}`} width={40} />
            </div>
        </div>

    )
}
export default DiaryEntry