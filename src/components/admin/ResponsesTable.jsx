import React, { useState } from 'react';

const ResponsesTable = ({ responses }) => {
  const [expandedId, setExpandedId] = useState(null);
  
  if (!responses || responses.length === 0) {
    return (
      <div className="text-center py-8 text-gray-600">
        No survey responses found.
      </div>
    );
  }
  
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Industry
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Company Size
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {responses.map((response) => (
            <React.Fragment key={response.id}>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {response.role === 'Other' ? response.roleOther : response.role}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {response.industry === 'Other' ? response.industryOther : response.industry}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{response.companySize}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{response.email || '-'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(response.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => toggleExpand(response.id)}
                    className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                  >
                    {expandedId === response.id ? 'Hide Details' : 'View Details'}
                  </button>
                </td>
              </tr>
              {expandedId === response.id && (
                <tr>
                  <td colSpan="6" className="px-6 py-4 bg-gray-50">
                    <div className="text-sm text-gray-900">
                      <h3 className="font-medium mb-2">Survey Response Details</h3>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div>
                          <p className="text-gray-500 text-xs">Needs App?</p>
                          <p>{response.needsApp ? 'Yes' : 'No'}</p>
                        </div>
                        
                        {response.needsApp && (
                          <>
                            <div>
                              <p className="text-gray-500 text-xs">Challenges</p>
                              <ul className="list-disc list-inside">
                                {response.challenges?.map((challenge, i) => (
                                  <li key={i}>{challenge}</li>
                                ))}
                                {response.challengesOther && (
                                  <li>Other: {response.challengesOther}</li>
                                )}
                              </ul>
                            </div>
                            
                            <div>
                              <p className="text-gray-500 text-xs">Solutions Used</p>
                              <ul className="list-disc list-inside">
                                {response.solutionsUsed?.map((solution, i) => (
                                  <li key={i}>{solution}</li>
                                ))}
                              </ul>
                            </div>
                          </>
                        )}
                        
                        <div>
                          <p className="text-gray-500 text-xs">Interested in No-Code</p>
                          <p>{response.interestedInNoCode}</p>
                        </div>
                        
                        {(response.interestedInNoCode === 'Yes, definitely' || 
                          response.interestedInNoCode === 'Maybe, I\'d need to know more') && (
                          <>
                            <div>
                              <p className="text-gray-500 text-xs">App Type</p>
                              <p>
                                {response.appType === 'Other' 
                                  ? `Other: ${response.appTypeOther}` 
                                  : response.appType}
                              </p>
                            </div>
                            
                            <div>
                              <p className="text-gray-500 text-xs">Budget</p>
                              <p>{response.budget}</p>
                            </div>
                          </>
                        )}
                        
                        <div>
                          <p className="text-gray-500 text-xs">Wants Consultation</p>
                          <p>{response.wantsConsultation ? 'Yes' : 'No'}</p>
                        </div>
                        
                        {response.comments && (
                          <div className="md:col-span-2 lg:col-span-3">
                            <p className="text-gray-500 text-xs">Comments</p>
                            <p>{response.comments}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResponsesTable;