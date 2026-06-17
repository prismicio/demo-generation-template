"use client"

import { SliceZone } from "@prismicio/react"
import {
	SimulatorManager,
	StateEventType,
	disableEventHandler,
	getDefaultMessage,
	getDefaultProps,
	getDefaultSlices,
	onClickHandler,
	simulatorClass,
	simulatorRootClass,
} from "@prismicio/simulator/kit"
import { useEffect, useState } from "react"

import { components } from "@/slices"

const simulatorManager = new SimulatorManager()

export default function SliceSimulatorPage() {
	const defaultProps = getDefaultProps()
	const { slices, message } = useSliceSimulator()

	return (
		<div
			className={simulatorClass}
			style={{
				zIndex: defaultProps.zIndex,
				position: "fixed",
				inset: 0,
				overflow: "auto",
				background: defaultProps.background,
			}}
		>
			{message ?
				<article dangerouslySetInnerHTML={{ __html: message }} />
			:	<div
					className={simulatorRootClass}
					onClickCapture={onClickHandler as unknown as React.MouseEventHandler}
					onSubmitCapture={
						disableEventHandler as unknown as React.FormEventHandler
					}
				>
					<SliceZone slices={slices} components={components} />
				</div>
			}
		</div>
	)
}

function useSliceSimulator() {
	const [slices, setSlices] = useState(() => getDefaultSlices())
	const [message, setMessage] = useState(() => getDefaultMessage())

	useEffect(() => {
		simulatorManager.state.on(
			StateEventType.Slices,
			(newSlices) => setSlices(newSlices),
			"simulator-slices",
		)
		simulatorManager.state.on(
			StateEventType.Message,
			(newMessage) => setMessage(newMessage),
			"simulator-message",
		)

		simulatorManager.init()

		return () => {
			simulatorManager.state.off(StateEventType.Slices, "simulator-slices")
			simulatorManager.state.off(StateEventType.Message, "simulator-message")
		}
	}, [])

	return { slices, message }
}
