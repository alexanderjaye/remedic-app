require('dotenv').config();

interface TranslationQuery {
  q: string;
  source: string;
  target: string;
  format: string;
}

/**
* *Returns translated text of input given source & target language codes
* @param text -> String or array of strings to be translated
* @param sourceLangCode -> String or array of strings to be translated
* @param targetLangCode -> 2 letter code target of translation
* @use -> const translatedText = await getTranslatedText('Hello World', 'en', 'es')
*/
export default async function getTranslatedText(text: string, sourceLangCode:string, targetLangCode: string): Promise<string> {
  const query: TranslationQuery = {
    q: text,
    source: sourceLangCode,
    target: targetLangCode,
    format: 'text'
  }

  const response = await fetch(`https://translation.googleapis.com/language/translate/v2/?key=${process.env.REACT_APP_GOOGLE_TRANSLATE_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(query)
  });

  const {data, errors} = await response.json();
  if (response.ok) {
    const translation: string = data?.translations[0];
    if (translation) return translation;
    else return Promise.reject(new Error('No translations available for posted query'));
  } else return Promise.reject(new Error('Something Has Gone Wrong'));
}


