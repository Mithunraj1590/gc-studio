'use client'

import React, { useState, useEffect } from 'react'
import Style from './Header.module.scss'

const TimeDisplay: React.FC = () => {
  const [time, setTime] = useState<string>('')
  const [timezone, setTimezone] = useState<string>('')
  const [timezoneAbbr, setTimezoneAbbr] = useState<string>('')

  useEffect(() => {
    // Get user's timezone
    const userTimezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone
    setTimezone(userTimezone)

    // Function to get timezone abbreviation
    const getTimezoneAbbr = (tz: string): string => {
      const date = new Date()
      const formatter = new Intl.DateTimeFormat('en', {
        timeZone: tz,
        timeZoneName: 'short'
      })
      const parts = formatter.formatToParts(date)
      const tzName = parts.find(part => part.type === 'timeZoneName')?.value || 'UTC'
      return tzName
    }

    // Function to format time in user's timezone
    const updateTime = (): void => {
      const now = new Date()
      
      // Get time in user's timezone
      const userTime = new Date(now.toLocaleString('en-US', { timeZone: userTimezone }))
      
      // Format time
      const hours = userTime.getHours().toString().padStart(2, '0')
      const minutes = userTime.getMinutes().toString().padStart(2, '0')
      const seconds = userTime.getSeconds().toString().padStart(2, '0')
      
      setTime(`${hours}:${minutes}:${seconds}`)
      
      // Get timezone abbreviation
      const abbr = getTimezoneAbbr(userTimezone)
      setTimezoneAbbr(abbr)
    }

    // Update immediately
    updateTime()

    // Update every second
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`${Style.TimeDisplay} text-white`}>
      <span className={Style.Time}>{time}</span>
      <span className={Style.Timezone} title={timezone}>
        {timezoneAbbr}
      </span>
    </div>
  )
}

export default TimeDisplay

