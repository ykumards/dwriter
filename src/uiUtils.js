const formatDatetime = (datetime) => {
    if (!datetime) return '';
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    const date = datetime.toLocaleDateString('en-GB', options);
    const time = datetime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    return `${date}, ${time}`;
  };


const getMostFrequentEmoji = (entries) => {
  const emojiCount = {};
  entries.forEach((entry) => {
    if (emojiCount[entry.emoji]) {
      emojiCount[entry.emoji]++;
    } else {
      emojiCount[entry.emoji] = 1;
    }
  });
  let mostFrequentEmoji = '';
  let maxCount = 0;
  for (const emoji in emojiCount) {
    if (emojiCount[emoji] > maxCount) {
      mostFrequentEmoji = emoji;
      maxCount = emojiCount[emoji];
    }
  }
  return mostFrequentEmoji;
};


export { formatDatetime, getMostFrequentEmoji };