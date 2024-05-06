export default function SentIcon({ active }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="-0.5 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.0098 12.39V7.39001C22.0098 6.32915 21.5883 5.31167 20.8382 4.56152C20.0881 3.81138 19.0706 3.39001 18.0098 3.39001H6.00977C4.9489 3.39001 3.93148 3.81138 3.18134 4.56152C2.43119 5.31167 2.00977 6.32915 2.00977 7.39001V17.39C2.00977 18.4509 2.43119 19.4682 3.18134 20.2184C3.93148 20.9685 4.9489 21.39 6.00977 21.39H12.0098"
        stroke={active ? '#4b0195' : '#656F7D'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.209 5.41992C15.599 16.0599 8.39906 16.0499 2.78906 5.41992"
        stroke={active ? '#4b0195' : '#656F7D'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.0098 18.39H23.0098"
        stroke={active ? '#4b0195' : '#656F7D'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.0098 15.39L23.0098 18.39L20.0098 21.39"
        stroke={active ? '#4b0195' : '#656F7D'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
