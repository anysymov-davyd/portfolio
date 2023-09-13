import React, { useState, useEffect } from 'react'

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, doc } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'
import { getStorage, ref, listAll, getDownloadURL, connectStorageEmulator } from 'firebase/storage'

import Home from './layouts/screens/Home'
import About from './layouts/screens/About'
import Services from './layouts/screens/Services'
import Works from './layouts/screens/Works'
import Contact from './layouts/screens/Contacts'

import NavigationPanel from './layouts/components/NavigationPanel'

import firebaseConfig from './data/firebaseConfig'
import localization from './data/localization'

function App() {
  const app = initializeApp(firebaseConfig)
  const analytics = getAnalytics(app)
  const db = getFirestore(app)
  const storage = getStorage(app)
  const storageRef = ref(storage, 'previews')

  const [workList, setWorkList] = useState([])

  useEffect(() => {
    let items = []
    let images = []

    listAll(storageRef)
    .then(res => {
      res.items.forEach(itemRef => {
        getDownloadURL(itemRef).then(url => {
          images.push(itemRef)
        })
      })
      getDocs(collection(db, 'works'))
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let image = images.find(image => image['_location']['path_'].split('/')[image['_location']['path_'].split('/').length - 1].split('.')[0] === doc.data().image)
          getDownloadURL(image)
          .then(url => {
            items.push({ data: doc.data(), image: url})
          })
        })
      })
      .then(() => {
        setWorkList(items)
      })
      .catch(error => console.error(error))
    })
  }, [])

  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [languageId, setLanguageId] = useState(
    localStorage.getItem('languageId') === null ?
      ['de', 'ua', 'ru'].find(id => id === navigator.language) ? navigator.language : 'en'
      : localStorage.getItem('languageId')
  )
  const [currentLocalization, setCurrentLocalization] = useState(localization[languageId])

  useEffect(() => {
    setCurrentLocalization(localization[languageId])
  }, [languageId])

  const getCurrentPageIndex = value => {
    setCurrentPageIndex(value)
  }

  const getCurrentLanguage = value => {
    setCurrentLocalization(localization[value.id])
    localStorage.setItem('languageId', value.id)
    setLanguageId(value.id)
  }

  const components = [
    <Home localization={currentLocalization.home}/>, 
    <About
      localization={currentLocalization.about}
      languageId={languageId}
    />,
    <Services
      localization={currentLocalization.services}
      getCurrentPageIndex={getCurrentPageIndex}
    />, 
    <Works
      localization={currentLocalization.works}
      works={workList}
    />,
    <Contact localization={currentLocalization.contacts}/>
  ]

  return (
    <div
      className='container'
    >
      <div
        className='background'
        style={{
          opacity: currentPageIndex === 0 ? 1 : 0
        }}
      />
      <NavigationPanel
        getCurrentPageIndex={getCurrentPageIndex}
        getCurrentLanguage={getCurrentLanguage}
        setCurrentPageIndex={currentPageIndex}
        localization={currentLocalization.navigation_panel}
      />
      <div className='pages'>
        {components.map((page, index) => {
          return (
            <div
              key={index}
              className='pages__item'
              style={{
                opacity: index === currentPageIndex ? 1 : 0,
                zIndex: index === currentPageIndex ? 0 : -1
              }}
            >
              { page }
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App