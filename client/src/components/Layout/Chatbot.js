import React, { useEffect } from 'react'
 
const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js'
    script.async = true
    document.body.appendChild(script)
 
    script.onload = () => {
      window.botpressWebChat.init({
        botId: 'cc4d5758-8302-4df6-89eb-9f81b208726a',
        hostUrl: 'https://cdn.botpress.cloud/webchat/v1',
        messagingUrl: 'https://messaging.botpress.cloud',
        clientId: 'cc4d5758-8302-4df6-89eb-9f81b208726a',
      })
    }
  }, [])
 
  return <div id="webchat" />
}
 
export default Chatbot