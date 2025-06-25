// app/api/translate/route.js
import { NextResponse } from 'next/server';
import { v2 as Translate } from '@google-cloud/translate';

const translate = new Translate({ projectId: 'sanguine-frame-461522-u8' });

export async function POST(req) {
  const body = await req.json();
  const { text, target = 'pl' } = body;

  try {
    let [translations] = await translate.translate(text, target);
    translations = Array.isArray(translations) ? translations : [translations];
    return NextResponse.json({ translations });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}
