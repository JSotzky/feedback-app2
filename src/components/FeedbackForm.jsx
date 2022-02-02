import React from 'react';
import Card from './shared/Card'
import {useState, useEffect, useContext} from 'react'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
import FeedbackContext from '../context/FeedbackContext'


function FeedbackForm() {

const [text, setText] = useState('')
const [rating,setRating] = useState(10)
const [btnDisabled, setBtnDisable] = useState(true)
const [message, setMessage] = useState('')
const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext)

useEffect(() => {
    if(feedbackEdit.edit === true){
        setBtnDisable(false)
        setText(feedbackEdit.item.text)
        setRating(feedbackEdit.item.rating)
    }
}, [feedbackEdit])

function handleTextChange(e){
    
    if(e.target.value === ''){
        setBtnDisable(true)
        setMessage(null)
    } else if(e.target.value.trim().length <= 10){
        setMessage('Text must be at least 10 characters')
    } else{
        setMessage(null)
        setBtnDisable(false)
    }
    
    setText(e.target.value)
}

function handleSubmit(e){
    e.preventDefault()
    if(text.trim().length > 10){
        const newFeedback = {
            text,
            rating
        }
        if(feedbackEdit.edit === true){
            updateFeedback(feedbackEdit.item.id, newFeedback)
        }else{
            addFeedback(newFeedback)
        }
        
        setText('')
    }
}

  return <Card>
      <form onSubmit={handleSubmit}>
          <h2>How would you rate this your service with us?</h2>
          {<RatingSelect select={rating => setRating(rating)}/>}
          <div className='input-group'>
            <input onChange={handleTextChange} 
                    type='text' 
                    placeholder='Write a review'
                    value={text} />
            <Button type="submit" version="secondary" isDisabled={btnDisabled}>Send</Button>
          </div>
          {message && <div className='message'>{message}</div>}
      </form>
  </Card>;
}

export default FeedbackForm;
