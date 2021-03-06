import {createContext, useState, useEffect} from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [feedback, setFeedback] = useState([])

    useEffect(() => {
        fetchFeedback()
    }, [])

    //fetch feedback
    async function fetchFeedback(){
        const response = await fetch("/feedback?_sort=id&order=desc");
        const data = await response.json();
        
        console.log(data)
        setFeedback(data)
        setIsLoading(false)
    }

const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
})
//update feedbackItem
    async function updateFeedback(id, updItem){
        const response = await fetch(`/feedback/${id}`, {method: 'PUT', 
                                                        headers: {
                                                                'Content-Type': 'application/json'
                                                                },
                                                        body: JSON.stringify(updItem)
    })
        const data = await response.json()
        setFeedback(feedback.map((item) => item.id === id ? {...item, ...data} : item))
        setFeedbackEdit({
            item: {},
            edit: false,
        })
    }

//Set item to be updated.
    function editFeedback(item){
        setFeedbackEdit({
            item,
            edit: true
        })
    }
//Delete feedback
    async function deleteFeedback(id){
        if(window.confirm('Are you sure you want to delete?')){
            await fetch(`feedback/${id}`, {method: 'DELETE'})
        setFeedback(feedback.filter(item => item.id !== id))}
    }
//addFeedback
    async function addFeedback(newFeedback){
        const response = await fetch("/feedback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newFeedback),
        })
        const data = await response.json()
        setFeedback([data, ...feedback])
    }

    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext