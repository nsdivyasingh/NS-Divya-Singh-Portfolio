"use client";

import { useState } from "react";
import { IntroLoader } from "./intro-loader";

export function IntroWrapper() {
  const [done, setDone] = useState(false);
  if (done) return null;
  return <IntroLoader onComplete={() => setDone(true)} />;
}
