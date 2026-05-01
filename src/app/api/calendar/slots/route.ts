import { NextRequest, NextResponse } from 'next/server'
import { getAvailableSlots, generateSampleSlots } from '@/lib/calendar'

export async function GET(request: NextRequest) {
  try {
    // Try to get real slots from database
    let slots = await getAvailableSlots()
    
    // If no slots found, generate sample slots for demonstration
    if (slots.length === 0) {
      console.log('No slots found in database, generating sample slots')
      slots = generateSampleSlots()
    }

    return NextResponse.json({
      success: true,
      slots: slots.map(slot => ({
        id: slot.id,
        title: slot.title,
        start: slot.start.toISOString(),
        end: slot.end.toISOString(),
        description: slot.description,
        isAvailable: slot.isAvailable
      }))
    })

  } catch (error) {
    console.error('Error fetching calendar slots:', error)
    
    // Fallback to sample slots in case of error
    const sampleSlots = generateSampleSlots()
    
    return NextResponse.json({
      success: true,
      slots: sampleSlots.map(slot => ({
        id: slot.id,
        title: slot.title,
        start: slot.start.toISOString(),
        end: slot.end.toISOString(),
        description: slot.description,
        isAvailable: slot.isAvailable
      })),
      fallback: true
    })
  }
}
