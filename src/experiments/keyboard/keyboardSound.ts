let ctx: AudioContext | null = null

export function playKeySound() {
  ctx ??= new AudioContext()

  const duration = 0.025
  const buffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate)
  const data = buffer.getChannelData(0)

  for (let i = 0; i < data.length; i++)
    data[i] = (Math.random() * 2 - 1) * (1 - i / data.length)

  const source = ctx.createBufferSource()
  const filter = ctx.createBiquadFilter()
  const gain = ctx.createGain()

  source.buffer = buffer
  filter.type = "bandpass"
  filter.frequency.value = 1800
  filter.Q.value = 0.8

  gain.gain.setValueAtTime(0.07, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)

  source.connect(filter).connect(gain).connect(ctx.destination)
  source.start()
}