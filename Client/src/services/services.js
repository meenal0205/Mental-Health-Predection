import axios from 'axios';

const URL = "http://127.0.0.1:5000/"

async function createDiaryEntry(title, username, diary_entry) {
    try {
        const response = await axios.post(URL + 'create-diary-entry', {

            'title': title,
            "username": username,
            "diary_entry": diary_entry

        })
        return response
    } catch (error) {
        console.log(error);

    }

}


async function createUser(username, password, type, location, exp) {

    try {
        let response;
        if (type === 'therapist')
            response = await axios.post(URL + "create-user", {
                "username": username,
                "password": password,
                "type": type,
                "location": location,
                "exp": exp,

            })

        else {
            response = await axios.post(URL + "create-user", {
                "username": username,
                "password": password,
                "type": type,
                "location": location,

            })

        }
        return response;
    } catch (error) {
        console.log(error);

    }
}


async function getAllTherapists() {
    try {

        const response = await axios.get(URL + "get-all-therapists")
        return response;
    } catch (error) {
        console.log(error);

    }
}


async function login(username, password, type) {
    try {
        const response = await axios.post(URL + 'login', {
            "username": username,
            "password": password,
            "type": type
        })
        return response
    } catch (error) {
        console.error(error);
    }
}


async function updateEntry(title, user, diary_entry) {
    try {
        const response = await axios.post(URL + 'update-diary-entry', {
            "title": title,
            "user": user,
            "diary_entry": diary_entry
        })
        return response;
    }
    catch (error) {
        console.error(error);
    }


}


async function getReportByUsername(username) {

    try {
        const response = await axios.get(URL + 'get-reports-by-userid?id=' + username)
        return response
    } catch (error) {
        console.log(error)
    }

}

async function getDashboardData(username) {

    try {
        const response = await axios.get(URL + 'get-weekly-monthly-reports?username=' + username)
        return response
    } catch (error) {
        console.log(error);

    }
}

async function getAllDiaryEntriesByUsername(username) {
    try {
        const response = await axios.get(URL + 'get-reports-by-username?username=' + username)
        return response
    }
    catch (error) {
        console.log(error)
    }
}


export { createDiaryEntry, createUser, getDashboardData, getReportByUsername, updateEntry, login, getAllTherapists, getAllDiaryEntriesByUsername }
