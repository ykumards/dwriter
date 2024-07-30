const formatDatetime = (datetime) => {
    if (!datetime) return '';
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    const date = datetime.toLocaleDateString('en-GB', options);
    const time = datetime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    return `${date}, ${time}`;
  };


export { formatDatetime };