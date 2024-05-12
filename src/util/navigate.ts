export function navigate2Login() {
  location.href = `${location.origin}/login`;
}

export function navigate2Pre() {
  console.log(history.length);
  if (history.length <= 2) {
    location.href = location.origin;
  } else {
    history.go(-1);
  }
}
