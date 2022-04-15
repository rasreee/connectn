import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Circle } from 'components/Circle'

export interface PlayerMetaProps {
  color: string
  name: string
}

export const PlayerMeta = ({ name, color }: PlayerMetaProps) => {
  return (
    <Container>
      <Circle color={color} size={18} />
      <span className='player-name'>{name}</span>
    </Container>
  )
}

export const CurrentPlayerInfo = ({ name, color }: PlayerMetaProps) => {
  return (
    <Container>
      <PlayerMeta name={name} color={color} />
      <RestText>'s turn</RestText>
    </Container>
  )
}

const Container = styled.div(
  css`
    display: flex;
    align-items: center;
  `,
)

const RestText = styled.span`
  width: max-content;
`
