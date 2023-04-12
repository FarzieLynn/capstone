import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App';

function ThreadDisplay() {
  const [comments, setComments] = useState([]);

  const {user, url} = useContext(AppContext);

  useEffect(()=> {
    fetch()
  }, [])
  return (
    <div>ThreadDisplay</div>
  )
}

export default ThreadDisplay