import React from "react";
import styled from "styled-components";
import * as r from "ramda";

const HomeContainer = styled.section.attrs({
  className: "pr3 blue bg-yellow"
})``;

const ListingItemList = styled.ul.attrs({
  className: "ba bw1 b--black"
})``;

const ListingItem = styled.li.attrs({
  className: "list bg-white"
})``;

const ListingItemNameText = styled.h3.attrs({
  className: "f3 b"
})``;

const Home = ({ listings }) => {
  return (
    <HomeContainer>
      <ListingItemList>
        {r.map(listing => (
          <ListingItem key={listing.id}>
            <ListingItemNameText>{listing.fields.Name}</ListingItemNameText>
          </ListingItem>
        ))(listings)}
      </ListingItemList>
    </HomeContainer>
  );
};

export default Home;
