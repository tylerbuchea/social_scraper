import React, { Component } from "react";
import { Table } from 'semantic-ui-react';
import Link from "gatsby-link"

const HomePage = ({ data }) => {
  const resources = data.allFile.edges
  console.log(data)
  return (
    <div>
      <h1>Home</h1>
      <p>The Home Page lists all resources created by users.</p>
      {resources ? <ResourceTable resources={resources} /> : null}
    </div>
  );
}


const ResourceTable = ({ resources }) => (
  <Table>
    <Table.Header>
      <Table.HeaderCell>UID</Table.HeaderCell>
      <Table.HeaderCell>Resource Name</Table.HeaderCell>
    </Table.Header>
    {resources.map(resource => 
      <Table.Row key={resource.node.name}>
        <Table.Cell>
          {resource.node.relativePath.split("_")[0]}
        </Table.Cell>
        <Link
          to={resource.node.name}
        >
          <Table.Cell>
            {resource.node.relativePath.split("_")[1].replace(".csv", "")}
          </Table.Cell>
        </Link>
      </Table.Row>
    )}
  </Table>
)

export default HomePage;