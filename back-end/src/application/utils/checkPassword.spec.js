/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import checkPassword from './checkPassword';

describe('Should verify checkout password', () => {
  it('My Test Case', () => {
    const pass = '$2a$08$kfaUv8oPd.X2Cd713vA2.ujg3MjympKsVIkMzj68k3R2kipqPokTG';
    const checkin = '$2a$08$kfaUv8oPd.X2Cd713vA2.ujg3MjympKsVIkMzj68k3R2kipqPokTG';
    expect(checkPassword(pass, checkin)).toEqual(true);
  });
});
