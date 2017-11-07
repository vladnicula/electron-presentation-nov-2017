import React from 'react'
import fetch from 'fetch'

import { ipcRenderer } from 'electron'

const fetchMyData = () => {
  return new Promise((resolve, reject) => {
    fetch.fetchUrl('https://api.github.com/orgs/facebook/repos', (err, meta, body) => {
      if ( err ) {
        return reject(err)
      }
      
      try {
        const result = JSON.parse(body)
        return resolve(result)
      } catch (err) {
        return reject(err)
      }

    })
  })
}

const buildReallyLongSelectBox = () => {
  return (
    <select>
      {new Array(100).fill(1).map((item, idx)=>(
        <option key={idx}>{idx}</option>
      ))}
    </select>
  )
}

export default class RepoViewer extends React.Component {

  constructor (props) {
    super(props)
    this.state = {repos:[]}
  }

  componentDidMount () {
    fetchMyData().then((data) => {
      ipcRenderer.send('data-fetched', JSON.stringify(data[0].name))

      this.setState({
        repos: data
      })
    })
  }

  render () {
    const { repos } = this.state
    return (
      <div className='repo-list-container'>
        <h2>Repo list</h2>
        {buildReallyLongSelectBox()}
        <div className='repo-list'>
        {repos.map((repo)=>(
          <div className='repo-list-item' key={repo.id}>
            <div className='repo-list-item-name'>{repo.full_name}</div>
            <div className='repo-list-item-stargazers'>{repo.stargazers_count}</div>
            <div className='repo-list-item-watchers'>{repo.watchers_count}</div>
            <div className='repo-list-item-forks'>{repo.forks_count}</div>
          </div>
        ))}
        </div>
      </div>
    )
  }
}