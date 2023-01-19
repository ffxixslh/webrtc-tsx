import { selectUserInfo } from '@/redux/features/user/userSlice'
import React from 'react'
import { useSelector } from 'react-redux'

export interface Message {
  id: string
  author: string
  content: string
}

interface Props {
  message: Message & {
    sameAuthor: boolean
  }
}

const MessageBox: React.FC<Props> = (props) => {
  const { message } = props

  const { username } = useSelector(selectUserInfo)

  return (
    <div key={message.id} className={`m-1`}>
      {!message.sameAuthor && (
        <div
          font-bold
          text-sm
          mx-1
          className={`${
            message.author === username ? 'text-right' : 'text-left'
          }`}
        >
          {message.author}
        </div>
      )}
      <div
        className={`px-2 py-1 bg-violet rd-2 w-fit  ${
          message.author === username ? 'float-right' : 'float-left'
        }`}
      >
        {message.content}
      </div>
    </div>
  )
}

export default MessageBox