function formatTitle(title: string, maxWidth: number, ctx: CanvasRenderingContext2D): string[] {
  const words = title.split(' ');

  return words.reduce((acc: string[], word) => {
    if (acc.length === 0) {
      return [word];
    }

    const currentLine = acc[acc.length - 1];

    if (ctx.measureText(currentLine + ' ' + word).width > maxWidth) {
      const [beforeDash, ...splitOnDash] = word.split('-');

      if (splitOnDash.length > 0 && ctx.measureText(currentLine + ' ' + beforeDash + '-').width <= maxWidth) {
        acc[acc.length - 1] = `${currentLine} ${beforeDash}`;
        acc.push(splitOnDash.join('-'));

        return acc;
      }

      acc.push(word);

      return acc;
    }

    acc[acc.length - 1] = `${currentLine} ${word}`;
    return acc;
  }, []);
}

export default formatTitle;
