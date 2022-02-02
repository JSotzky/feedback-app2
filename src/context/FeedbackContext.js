import {createContext, useState} from 'react'
import {nanoid} from 'nanoid'
import { v4 as uuidv4} from 'uuid' 

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([
        {
            id: nanoid(),
            text: 'this item is from context 1',
            rating:1
            },
            {
                id: nanoid(),
                text: 'this item is from context 2',
                rating:7
                },
                {
                    id: nanoid(),
                    text: 'this item is from context 3',
                    rating:5
                    },
])

const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
})
//update feedbackItem
    function updateFeedback(id, updItem){
        setFeedback(feedback.map((item) => item.id === id ? {...item, ...updItem} : item))
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
    function deleteFeedback(id){
        if(window.confirm('Are you sure you want to delete?')){
        setFeedback(feedback.filter(item => item.id !== id))}
    }
//addFeedback
    function addFeedback(newFeedback){
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
    }

    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext