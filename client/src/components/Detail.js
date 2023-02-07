import React from 'react'
import { Typography, Stack, Button } from '@mui/joy';



const Detail = ( WorkoutDetail ) => {
  const {bodyPart, gifUrl, name, target, equipment } = WorkoutDetail;

  const extraDetail = [
    {
      icon: BodyPartImage,
      name: bodyPart,
    },
    {
      icon: TargetImage,
      name: target,
    },
    {
      icon: EquipmentImage,
      name: equipment, 
    }, 
  ]
  

  return (
    <Stack gap="60px" sx={{flexDirection: { lg: 'row' }, p: '20px', alignItems: 'center' }}>
      <img src={gifUrl} alt={name} Loading="lazy" className="detail-image"/>
      <Stack sx={{ gap: { lg: '35px', xs: '20px' }}}>
          <Typography>
            {name}
          </Typography>
          <Typography variant="h6">
            Working Out {name} { ` ` }

          </Typography>
          {extraDetail.map((item) => (
            <Stack key={item.name} direction="row" gap="24px" alignItems="center">
            </Stack>

          ))}
      </Stack>
    </Stack>
  )
}

export default Detail