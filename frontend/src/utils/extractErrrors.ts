export function extractErrors(obj: any, path: string[] = []): string[] {
    let messages: string[] = [];
  
    if (obj && typeof obj === 'object') {
      if (Array.isArray(obj._errors) && obj._errors.length > 0) {
        const fieldName = path.join('.');
        messages.push(
          ...obj._errors
            .filter((e: unknown): e is string => typeof e === 'string' && e.trim() !== '')
            .map((msg: string) => `${fieldName}: ${msg}`)
        );
      }
  
      // Recorrer propiedades internas
      for (const key of Object.keys(obj)) {
        if (key !== '_errors') {
          messages.push(...extractErrors((obj as Record<string, unknown>)[key], [...path, key]));
        }
      }
    }
  
    return messages;
  }