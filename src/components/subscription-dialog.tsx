"use client"
import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { CreditCard } from "lucide-react"

const SubscriptionDropdownItem = () => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[650px] rounded-2xl bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
          <div className="p-4 sm:p-6 space-y-6">
            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Free Plan */}
              <div className="border p-6 rounded-xl text-center shadow-lg border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold">Free</h3>
                <p className="text-3xl sm:text-4xl font-bold mt-2">
                  $0<span className="text-sm font-normal"> /1 month</span>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  You can make queries only with this plan.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-gray-500 dark:text-gray-400 text-left">
                  <li>✓ Your plan specification will show here.</li>
                  <li>✓ Your plan specification will show here.</li>
                  <li>✓ Your plan specification will show here.</li>
                  <li>✓ Your plan specification will show here.</li>
                  <li>✓ Your plan specification will show here.</li>
                </ul>
                <button className="mt-6 w-full bg-transparent text-gray-900 dark:text-white py-2 rounded-md border border-gray-400 dark:border-gray-500 font-medium">
                  Your Current Plan
                </button>
              </div>

              {/* Pro Plan */}
              <div className="border p-6 rounded-xl text-center shadow-lg border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold">Pro</h3>
                <p className="text-3xl sm:text-4xl font-bold mt-2">
                  $19<span className="text-sm font-normal"> /per month</span>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  You can make queries only with this plan.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-gray-500 dark:text-gray-400 text-left">
                  <li>✓ Your plan specification will show here.</li>
                  <li>✓ Your plan specification will show here.</li>
                  <li>✓ Your plan specification will show here.</li>
                  <li>✓ Your plan specification will show here.</li>
                  <li>✓ Your plan specification will show here.</li>
                </ul>
                <button className="mt-6 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 font-medium">
                  Purchase Now
                </button>
              </div>
            </div>

            {/* Go Back Button */}
            <div className="text-center">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-1 border border-gray-400 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300 rounded-md hover:text-black hover:border-black dark:hover:text-white dark:hover:border-white"
              >
                Go Back
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dropdown Menu Item */}
      <DropdownMenuItem
        onClick={(e) => {
          e.preventDefault()
          setOpen(true)
        }}
        className="flex items-center gap-2 text-green-600 hover:text-green-700"
      >
        <CreditCard className="h-4 w-4" />
        Subscription
      </DropdownMenuItem>
    </div>
  )
}

export default SubscriptionDropdownItem
