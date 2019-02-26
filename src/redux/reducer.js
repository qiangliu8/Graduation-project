import {combineReducers} from 'redux'
import {user} from './user.redux'
import {chat} from './chat.redux'
import {note} from './note.redux'
export default combineReducers({user,chat,note})

