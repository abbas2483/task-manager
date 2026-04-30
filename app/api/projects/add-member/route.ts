import { NextRequest, NextResponse } from 'next/server'
import { addProjectMember } from '@/app/actions/projects'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const { projectId, email } = await request.json()

    if (!projectId || !email) {
      return NextResponse.json(
        { error: 'Project ID and email are required' },
        { status: 400 }
      )
    }

    const result = await addProjectMember(projectId, email)

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Add member error:', error)
    return NextResponse.json(
      { error: 'Failed to add member' },
      { status: 500 }
    )
  }
}
