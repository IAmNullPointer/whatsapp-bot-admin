"use client";

import React from "react";

type Props = {
  botName?: string;
  currentUsage: number;
  trialLimit: number;
  onUpgradeClick?: () => void;
};

export default function BotUpgradeWidget({
  botName = "Your Bot",
  currentUsage,
  trialLimit,
  onUpgradeClick,
}: Props) {
  const percentUsed = Math.min(100, Math.round((currentUsage / trialLimit) * 100));
  const quotaText = `${currentUsage} / ${trialLimit} messages used`;

  return (
    <div className="mx-auto mb-10 w-full max-w-60 rounded-2xl bg-gray-50 px-4 py-5 text-center dark:bg-white/[0.03]">
      <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
        {botName} Trial Limit
      </h3>

      <p className="mb-4 text-gray-500 text-theme-sm dark:text-gray-400">
        {quotaText} <br />
        {percentUsed >= 100
          ? "You've hit your trial limit."
          : `You're at ${percentUsed}% of your quota.`}
      </p>

      <button
        onClick={onUpgradeClick}
        className="flex items-center justify-center w-full p-3 font-medium text-white rounded-lg bg-brand-500 text-theme-sm hover:bg-brand-600"
      >
        Upgrade Plan
      </button>
    </div>
  );
}
