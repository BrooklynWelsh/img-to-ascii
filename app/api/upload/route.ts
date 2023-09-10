import { NextResponse } from 'next/server'
import { customAlphabet } from 'nanoid'
export const runtime = 'edge'

const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
) // 7-character random string
export async function POST(req: Request) {
  return NextResponse.json({status: 200})
}
