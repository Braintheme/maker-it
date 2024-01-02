const strippeHTMLTags = string => string.replace(/(<([^>]+)>)/gi, "");

const trimString = (string, limit) => {
  if(string.length <= limit) {
    return string
  }else {
    return string.slice(0, limit) + '...'
  }
}

export {
  strippeHTMLTags,
  trimString
}

