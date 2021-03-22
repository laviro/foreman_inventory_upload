import React from 'react';
import axios from 'axios';
import { IntegrationTestHelper, MockAdapter } from '@theforeman/test';
import SyncButton from '../index';
import { successResponse } from './SyncButtonFixtures';
import apiReducer from '../../../../../../__mocks__/foremanReact/redux/API/APIReducer';
import { APIMiddleware } from '../../../../../../__mocks__/foremanReact/redux/API/APIMiddleware';

const mock = new MockAdapter(axios);
mock.onPost().reply(({ url }) => new Promise(resolve => successResponse));

describe('SyncButton integration test', () => {
  it('should flow', async () => {
    const integrationTestHelper = new IntegrationTestHelper(
      { API: apiReducer },
      [APIMiddleware]
    );
    const wrapper = integrationTestHelper.mount(<SyncButton />);
    const instance = wrapper.find('SyncButton').instance();
    instance.props.handleSync();
    await IntegrationTestHelper.flushAllPromises();
    integrationTestHelper.takeStoreAndLastActionSnapshot(
      'handleSync was called'
    );
  });
});
