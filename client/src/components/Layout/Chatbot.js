import React, { useEffect } from 'react'
 
const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js'
    script.async = true
    document.body.appendChild(script)
 
    script.onload = () => {
      window.botpressWebChat.init({
        botId: '1b2ee469-cf62-425c-8233-57d2c58021c9',
        hostUrl: 'https://cdn.botpress.cloud/webchat/v1',
        messagingUrl: 'https://messaging.botpress.cloud',
        clientId: '1b2ee469-cf62-425c-8233-57d2c58021c9',
      })
    }
  }, [])
 
  return <div id="webchat" />
}
 
export default Chatbot